import { CssSelectorParser } from 'css-selector-parser';
import postcss from 'postcss';

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

export default uncurry(from => flow([
  (value) => {
    if (!value) {
      throw new Error('Can’t parse an empty string');
    }
    return value;
  },
  // Parse the css string with the `postcss` parser.
  value => postcss.parse(value, { from }),
  // Get the top level nodes (regular rules and @-rules like media).
  obj => obj.nodes,

  // PART 1: Handle media
  // Extract all top level nodes that are regular rules.
  partition(node => node.type === 'rule'),
  // Make a "null" media node for the extracted rules and re-add the rest.
  ([rulesWithoutMedia, rest]) => [
    {
      name: 'media',
      params: null,
      type: 'atrule',
      nodes: rulesWithoutMedia,
    },
    ...rest,
  ],
  // Filter out all top level nodes that are not media nodes.
  filter(node => node.type === 'atrule' && node.name === 'media'),
  flatMap(
    mediaNode => flow([
      // In each media node, filter out all nodes that are not rules
      filter(node => node.type === 'rule'),
      // Add `media` property to every rule node.
      map(
        node => ({
          ...node,
          media: mediaNode.params,
        }),
      ),
    ])(mediaNode.nodes),
  ),

  // PART 2: Parse the selectors and split rules with stacked selectors
  map(
    node => ({
      ...node,
      parsedSelector: parseSelector(node.selector),
    }),
  ),
  flatMap(
    node => (
      node.parsedSelector.type === 'selectors'
      ? map(
        selector => ({
          ...node,
          parsedSelector: selector,
          selector: null,
        }),
        node.parsedSelector.selectors,
      )
      : [
        node,
      ]
    ),
  ),

  // PART 3: Handle selectors
  // Filter out rules with selectors that contain tag names, attributes or nesting operators.
  filter(
    node => (
      !node.parsedSelector.rule.tagName
      && !node.parsedSelector.rule.attrs
      && !node.parsedSelector.rule.nestingOperator
    ),
  ),
  // Filter out rules with not exactly one class name.
  filter(
    node => (
      node.parsedSelector.rule.classNames
      && node.parsedSelector.rule.classNames.length === 1
    ),
  ),
  // Invalidate rules with selectors that contain blacklisted pseudo classes/elements
  // or have more than one pseudo.
  map(
    node => ({
      ...node,
      invalid: (
        node.invalid
        || (
          node.parsedSelector.rule.pseudos
          && (
            (
              node.parsedSelector.rule.pseudos.length > 1
              && 'More than one pseudo class/element in selector'
            )
            || (
              !PSEUDO_CLASSES.includes(node.parsedSelector.rule.pseudos[0].name)
              && 'Forbidden pseudo class/element in selector'
            )
          )
        )
      ) || false,
    }),
  ),
  // Add class name and state to each rule.
  map(
    node => ({
      ...node,
      className: node.parsedSelector.rule.classNames[0],
      state: (
        (
          node.parsedSelector.rule.pseudos
          && node.parsedSelector.rule.pseudos[0]
          && node.parsedSelector.rule.pseudos[0].name
        )
        || null
      ),
    }),
  ),

  // PART 4: Handle declarations
  map(
    node => ({
      ...node,
      css: flow([
        // Filter out nodes that are not declarations
        filter(childNode => childNode.type === 'decl'),
        // Sort
        sortBy('prop'),
        map(({ prop, value }) => [prop, value]),
      ])(node.nodes),
    }),
  ),

  // PART 5: Merge rules with same class name
  groupBy(
    node => node.className,
  ),
  map(
    nodes => ({
      ...nodes[0],
      css: flow([
        map(node => node.css),
        unionAllBy(0),
      ])(nodes),
    }),
  ),

  // PART 6: Merge rules with same declarations
  // Use `JSON.stringify` to group rules
  groupBy(
    node => JSON.stringify(node.css),
  ),
  // Convert the grouped rules to items
  map(
    nodes => ({
      ...nodes[0],
      classNames: flow([
        map(node => ({
          name: node.className,
          state: node.state,
          media: node.media,
        })),
        sortBy([
          className => className.state || '',
          className => className.media || '',
        ]),
      ])(nodes),
      css: flow([
        fromPairs,
      ])(nodes[0].css),
    }),
  ),
]));
