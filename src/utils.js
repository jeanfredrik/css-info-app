/* eslint-disable import/prefer-default-export */

import update from 'immutability-helper';
import Color from 'color';
import valueParser from 'postcss-value-parser';

import {
  camelCase,
  constant,
  difference,
  filter,
  find,
  first,
  flatMap,
  flow,
  has,
  intersection,
  keys,
  lowerCase,
  map,
  mapKeys,
  omitBy,
  placeholder as $,
  uniq,
  upperFirst,
  values,
  words,
} from 'lodash/fp';

import categorizeItems from './categorizeItems';

export const uncurry = fn => (...args) => {
  const result = Array.prototype.reduce.call(
    args,
    (value, arg) => value(arg),
    fn,
  );
  if (typeof result === 'function') {
    return uncurry(result);
  }
  return result;
};

export const push = uncurry(
  element =>
  array =>
  array.concat(element),
);

export const updateState = uncurry(
  component =>
  modifier =>
  new Promise((resolve) => {
    component.setState(state => update(state, modifier), resolve);
  }),
);

export const updateStateWith = uncurry(
  component =>
  modifier =>
  new Promise((resolve) => {
    component.setState(state => update(state, modifier(state)), resolve);
  }),
);

export const matchAllProperties = properties => flow([
  item => item.css,
  keys,
  filter(property => !property.startsWith('-')),
  difference($, properties),
  result => result.length === 0,
]);

export const matchExactProperties = properties => flow([
  item => item.css,
  keys,
  filter(property => !property.startsWith('-')),
  result => (
    properties.length === result.length
    && intersection(properties, result).length === result.length
  ),
]);

export const matchOnlyProperties = properties => flow([
  item => item.css,
  keys,
  filter(property => !property.startsWith('-')),
  result => (
    intersection(properties, result).length === result.length
  ),
]);

window.matchOnlyProperties = matchOnlyProperties;

export const matchAny = constant(true);

export const normalizeStyleObject = flow([
  omitBy((value, key) => key.startsWith('-')),
  mapKeys(camelCase),
]);

export const transformItems = flow([
  map(item => ({
    ...item,
    key: JSON.stringify(item.css),
    keywords: flow([
      filter(word => word && typeof word === 'string'),
      uniq,
    ])([
      ...item.classNames.map(className => className.name),
      ...flatMap(
        words,
        item.classNames.map(className => className.name),
      ),
      ...item.classNames.map(className => className.state),
      ...item.classNames.map(className => className.state && `:${className.state}`),
      ...item.classNames.map(className => className.media && '@'),
      ...values(item.css),
      ...keys(item.css),
    ]),
  })),
]);

export const splitQuery = query => query.trim().split(/\s+/g).map(word => word.toLowerCase());

export const prepareItems = uncurry(categories => (query) => {
  const queryWords = splitQuery(query);
  return flow([
    filter(
      item => queryWords.every(
        queryWord => item.keywords.some(keyword => keyword.startsWith(queryWord)),
      ),
    ),
    categorizeItems(categories),
  ]);
});

export const getCSSValue = property => flow([
  find(declaration => declaration[0] === property),
  declaration => declaration && declaration[1],
]);

export const belowContrast = uncurry(contrast => color1 => (color2) => {
  try {
    return Color(color1).alpha(1).contrast(Color(color2).alpha(1)) < contrast;
  } catch (e) {
    return false;
  }
});

export const isWhite = (color) => {
  try {
    return Color(color).alpha(1).luminosity() === 1;
  } catch (e) {
    return false;
  }
};

export const isLowContrast = belowContrast(4.5, 'white');

export const matchAll = uncurry(
  matchers =>
  item =>
  matchers.every(matcher => matcher(item)),
);

export const matchOneOf = uncurry(
  matchers =>
  item =>
  matchers.some(matcher => matcher(item)),
);

export const hasUniformValues = flow([
  values,
  uniq,
  value => value.length === 1,
]);

export const hasEvery = uncurry(
  otherKeys =>
  object =>
  otherKeys.every(otherKey => has(otherKey, object)),
);

export const hasSome = uncurry(
  otherKeys =>
  object =>
  otherKeys.some(otherKey => has(otherKey, object)),
);

const COLOR_FUNCTIONS = [
  'rgb',
  'rgba',
  'hsl',
  'hsla',
  'hsb',
  'hsba',
];

const NAMED_COLORS = [
  'transparent',
  'aliceblue',
  'antiquewhite',
  'aqua',
  'aquamarine',
  'azure',
  'beige',
  'bisque',
  'black',
  'blanchedalmond',
  'blue',
  'blueviolet',
  'brown',
  'burlywood',
  'cadetblue',
  'chartreuse',
  'chocolate',
  'coral',
  'cornflowerblue',
  'cornsilk',
  'crimson',
  'cyan',
  'darkblue',
  'darkcyan',
  'darkgoldenrod',
  'darkgray',
  'darkgreen',
  'darkgrey',
  'darkkhaki',
  'darkmagenta',
  'darkolivegreen',
  'darkorange',
  'darkorchid',
  'darkred',
  'darksalmon',
  'darkseagreen',
  'darkslateblue',
  'darkslategray',
  'darkslategrey',
  'darkturquoise',
  'darkviolet',
  'deeppink',
  'deepskyblue',
  'dimgray',
  'dimgrey',
  'dodgerblue',
  'firebrick',
  'floralwhite',
  'forestgreen',
  'fuchsia',
  'gainsboro',
  'ghostwhite',
  'gold',
  'goldenrod',
  'gray',
  'green',
  'greenyellow',
  'grey',
  'honeydew',
  'hotpink',
  'indianred',
  'indigo',
  'ivory',
  'khaki',
  'lavender',
  'lavenderblush',
  'lawngreen',
  'lemonchiffon',
  'lightblue',
  'lightcoral',
  'lightcyan',
  'lightgoldenrodyellow',
  'lightgray',
  'lightgreen',
  'lightgrey',
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightslategray',
  'lightslategrey',
  'lightsteelblue',
  'lightyellow',
  'lime',
  'limegreen',
  'linen',
  'magenta',
  'maroon',
  'mediumaquamarine',
  'mediumblue',
  'mediumorchid',
  'mediumpurple',
  'mediumseagreen',
  'mediumslateblue',
  'mediumspringgreen',
  'mediumturquoise',
  'mediumvioletred',
  'midnightblue',
  'mintcream',
  'mistyrose',
  'moccasin',
  'navajowhite',
  'navy',
  'oldlace',
  'olive',
  'olivedrab',
  'orange',
  'orangered',
  'orchid',
  'palegoldenrod',
  'palegreen',
  'paleturquoise',
  'palevioletred',
  'papayawhip',
  'peachpuff',
  'peru',
  'pink',
  'plum',
  'powderblue',
  'purple',
  'rebeccapurple',
  'red',
  'rosybrown',
  'royalblue',
  'saddlebrown',
  'salmon',
  'sandybrown',
  'seagreen',
  'seashell',
  'sienna',
  'silver',
  'skyblue',
  'slateblue',
  'slategray',
  'slategrey',
  'snow',
  'springgreen',
  'steelblue',
  'tan',
  'teal',
  'thistle',
  'tomato',
  'turquoise',
  'violet',
  'wheat',
  'white',
  'whitesmoke',
  'yellow',
  'yellowgreen',
];

function getColorNodes(nodes) {
  return nodes.filter(node => (
    (
      node.type === 'word'
      && /^#[a-fA-F0-9]{3,8}/.test(node.value)
    )
    || (
      node.type === 'word'
      && node.value.toLowerCase() === 'currentcolor'
    )
    || (
      node.type === 'word'
      && NAMED_COLORS.includes(node.value.toLowerCase())
    )
    || (
      node.type === 'function'
      && COLOR_FUNCTIONS.includes(node.value.toLowerCase())
    )
  ));
}

export const firstColorNodeValue = flow([
  value => valueParser(value).nodes,
  getColorNodes,
  first,
  value => value && valueParser.stringify(value),
]);

export const firstValue = flow([
  values,
  first,
]);

export const titleCase = flow([
  lowerCase,
  upperFirst,
]);

export const truncateURL = url => url.replace(
  /^https?:\/\/(.*?)(\/.*?)?(\/[^/]+)$/,
  (match, p1, p2, p3) => {
    if (p2) {
      return `${p1}/…${p3}`;
    }
    return `${p1}${p3}`;
  },
);

/*
This is a utility function for compatibility with `css-selector-parser`.
Characters U+00A0 and higher are valid in CSS identifiers according to the spec,
but that package can’t handle them, so we have to escape them like you would do
in CSS, e.g. "ö" becomes "\F6 ". `css-selector-parser` decodes all escaped
character sequences during parsing, so no need for an `unescapeSelector` function.
*/
export const escapeSelector = selector => selector.replace(
  /[^\x00-\xA0]/g,
  match => `\\${match.charCodeAt(0).toString(16).toUpperCase()} `,
);
