import { CssSelectorParser } from 'css-selector-parser';
import CSS from 'css';

import {
  filter,
  flatMap,
  flow,
  fromPairs,
  groupBy,
  map,
  partition,
  reduce,
  sortBy,
  unionBy,
} from 'lodash/fp';

import { uncurry } from './utils';

const unionAllBy = iterator => reduce(unionBy(iterator), []);

const PSEUDO_CLASSES = [
  'active',
  'any',
  'checked',
  'default',
  'dir',
  'disabled',
  'empty',
  'enabled',
  'first',
  'first-child',
  'first-of-type',
  'fullscreen',
  'focus',
  'hover',
  'indeterminate',
  'in-range',
  'invalid',
  'lang',
  'last-child',
  'last-of-type',
  'left',
  'link',
  'not',
  'nth-child',
  'nth-last-child',
  'nth-last-of-type',
  'nth-of-type',
  'only-child',
  'only-of-type',
  'optional',
  'out-of-range',
  'read-only',
  'read-write',
  'required',
  'right',
  'root',
  'scope',
  'target',
  'valid',
  'visited',
];

const selectorParser = new CssSelectorParser();

selectorParser.registerNestingOperators('>', '+', '~');
selectorParser.registerAttrEqualityMods('^', '$', '*', '~');

const parseSelector = selector => selectorParser.parse(selector);

export default uncurry(source => flow([
  (value) => {
    if (!value) {
      throw new Error('Can’t parse an empty string');
    }
    return value;
  },
  // Parse the css string with the `css` package.
  value => CSS.parse(value, { source }),
  // Get the top level nodes (regular rules and @-rules like media).
  obj => obj.stylesheet.rules,

  // PART 1: Handle media
  // Extract all top level nodes that are regular rules.
  partition(node => node.type === 'rule'),
  // Make a "null" media node for the extracted rules and re-add the rest.
  ([rulesWithoutMedia, rest]) => [
    {
      media: null,
      type: 'media',
      rules: rulesWithoutMedia,
    },
    ...rest,
  ],
  // Filter out all top level nodes that are not media nodes.
  filter(node => node.type === 'media'),
  flatMap(
    mediaRule => flow([
      // In each media node, filter out all nodes that are not rules
      filter(node => node.type === 'rule'),
      // Add `media` property to every rule node.
      map(
        rule => ({
          ...rule,
          media: mediaRule.media,
        }),
      ),
    ])(mediaRule.rules),
  ),

  // PART 2: Split rules with stacked selectors and parse the selectors
  flatMap(
    rule => flow([
      map(
        selector => ({
          ...rule,
          selector,
        }),
      ),
    ])(rule.selectors),
  ),
  map(
    rule => ({
      ...rule,
      parsedSelector: parseSelector(rule.selector),
    }),
  ),

  // PART 3: Handle selectors
  // Filter out rules with selectors that contain tag names, attributes or nesting operators.
  filter(
    rule => (
      !rule.parsedSelector.rule.tagName
      && !rule.parsedSelector.rule.attrs
      && !rule.parsedSelector.rule.nestingOperator
    ),
  ),
  // Filter out rules with not exactly one class name.
  filter(
    rule => (
      rule.parsedSelector.rule.classNames
      && rule.parsedSelector.rule.classNames.length === 1
    ),
  ),
  // Invalidate rules with selectors that contain blacklisted pseudo classes/elements
  // or have more than one pseudo.
  map(
    rule => ({
      ...rule,
      invalid: (
        rule.invalid
        || (
          rule.parsedSelector.rule.pseudos
          && (
            (
              rule.parsedSelector.rule.pseudos.length > 1
              && 'More than one pseudo class/element in selector'
            )
            || (
              !PSEUDO_CLASSES.includes(rule.parsedSelector.rule.pseudos[0].name)
              && 'Forbidden pseudo class/element in selector'
            )
          )
        )
      ) || false,
    }),
  ),
  // Add class name and state to each rule.
  map(
    rule => ({
      ...rule,
      className: rule.parsedSelector.rule.classNames[0],
      state: (
        (
          rule.parsedSelector.rule.pseudos
          && rule.parsedSelector.rule.pseudos[0]
          && rule.parsedSelector.rule.pseudos[0].name
        )
        || null
      ),
    }),
  ),

  // PART 4: Handle declarations
  map(
    rule => ({
      ...rule,
      css: flow([
        // Filter out nodes that are not declarations
        filter(node => node.type === 'declaration'),
        // Sort
        sortBy('property'),
        map(({ property, value }) => [property, value]),
      ])(rule.declarations),
    }),
  ),

  // PART 5: Merge rules with same class name
  groupBy(
    rule => rule.className,
  ),
  map(
    rules => ({
      ...rules[0],
      css: flow([
        map(rule => rule.css),
        unionAllBy(0),
      ])(rules),
    }),
  ),

  // PART 6: Merge rules with same declarations
  // Use `JSON.stringify` to group rules
  groupBy(
    rule => JSON.stringify(rule.css),
  ),
  // Convert the grouped rules to items
  map(
    rules => ({
      ...rules[0],
      classNames: flow([
        map(rule => ({
          name: rule.className,
          state: rule.state,
          media: rule.media,
        })),
        sortBy([
          className => className.state || '',
          className => className.media || '',
        ]),
      ])(rules),
      css: flow([
        fromPairs,
      ])(rules[0].css),
    }),
  ),
]));
