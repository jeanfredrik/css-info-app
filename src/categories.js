import {
  defaults,
  has,
  keys,
  map,
  uniq,
  values,
} from 'lodash/fp';

import {
  hasEvery,
  hasUniformValues,
  matchAll,
  matchAny,
  matchExactProperties,
  matchOneOf,
  matchOnlyProperties,
  titleCase,
} from './utils';
import BackgroundColorItem from './BackgroundColorItem';
import BorderColorItem from './BorderColorItem';
import BorderItem from './BorderItem';
import BorderRadiusItem from './BorderRadiusItem';
import BorderStyleItem from './BorderStyleItem';
import BorderWidthItem from './BorderWidthItem';
import BoxShadowItem from './BoxShadowItem';
import ColorItem from './ColorItem';
import DefaultItem from './DefaultItem';
import FontFamilyItem from './FontFamilyItem';
import FontSizeItem from './FontSizeItem';
import FontStyleItem from './FontStyleItem';
import HeightItem from './HeightItem';
import MarginItem from './MarginItem';
import PaddingItem from './PaddingItem';
import WidthItem from './WidthItem';

export default map(defaults({
  Component: DefaultItem,
  containerProps: {
    size: '40rem',
  },
  displayValue(css) {
    const uniqueValues = uniq(values(css));
    if (uniqueValues.length > 1) {
      return null;
    }
    return uniqueValues[0];
  },
}), [
  {
    title: 'Background color',
    Component: BackgroundColorItem,
    containerProps: {
      size: '20rem',
    },
    matchItem: matchExactProperties(['background-color']),
  },
  {
    title: 'Text color',
    Component: ColorItem,
    containerProps: {
      size: '20rem',
    },
    matchItem: matchExactProperties(['color']),
  },
  {
    title: 'Font family',
    Component: FontFamilyItem,
    containerProps: {
      size: '30rem',
    },
    matchItem: matchExactProperties(['font-family']),
  },
  {
    title: 'Font size',
    Component: FontSizeItem,
    containerProps: {
      size: '30rem',
    },
    matchItem: matchExactProperties(['font-size']),
  },
  ...[
    'font-style',
    'font-weight',
    'line-height',
    'text-transform',
    'text-align',
    'text-decoration',
  ].map(
    property => ({
      title: titleCase(property),
      Component: FontStyleItem,
      containerProps: {
        size: '20rem',
      },
      matchItem: matchExactProperties([property]),
    }),
  ),
  {
    title: 'Border color',
    Component: BorderColorItem,
    containerProps: {
      size: '20rem',
    },
    matchItem: matchAll([
      matchOnlyProperties([
        'border-color',
        'border-top-color',
        'border-right-color',
        'border-bottom-color',
        'border-left-color',
      ]),
      item => hasUniformValues(item.css),
    ]),
  },
  {
    title: 'Border width',
    Component: BorderWidthItem,
    containerProps: {
      size: '20rem',
    },
    matchItem: matchAll([
      matchOnlyProperties([
        'border-width',
        'border-top-width',
        'border-right-width',
        'border-bottom-width',
        'border-left-width',
      ]),
      item => hasUniformValues(item.css),
    ]),
  },
  {
    title: 'Border style',
    Component: BorderStyleItem,
    containerProps: {
      size: '20rem',
    },
    matchItem: matchAll([
      matchOnlyProperties([
        'border-style',
        'border-top-style',
        'border-right-style',
        'border-bottom-style',
        'border-left-style',
      ]),
      item => hasUniformValues(item.css),
    ]),
  },
  ...['top', 'right', 'bottom', 'left'].map(
    direction => (
      {
        title: `Border ${direction}`,
        Component: BorderItem,
        containerProps: {
          size: '20rem',
        },
        matchItem: matchOneOf([
          matchExactProperties([
            `border-${direction}`,
          ]),
          matchExactProperties([
            `border-${direction}-style`,
            `border-${direction}-width`,
          ]),
          matchExactProperties([
            `border-${direction}-style`,
            `border-${direction}-color`,
            `border-${direction}-width`,
          ]),
        ]),
      }
    ),
  ),
  {
    title: 'Border all sides',
    Component: BorderItem,
    containerProps: {
      size: '20rem',
    },
    matchItem: matchAll([
      item => keys(item.css).every(
        key =>
        /^border(-(top|right|bottom|left))?(-(style|color|width))?/.test(key),
      ),
      matchOneOf([
        matchExactProperties([
          'border',
        ]),
        matchExactProperties([
          'border-style',
          'border-width',
        ]),
        matchAll(['top', 'right', 'bottom', 'left'].map(
          direction =>
          matchOneOf([
            item => has(`border-${direction}`, item.css),
            item => hasEvery([
              `border-${direction}-style`,
              `border-${direction}-width`,
            ], item.css),
            item => hasEvery([
              `border-${direction}-style`,
              `border-${direction}-color`,
              `border-${direction}-width`,
            ], item.css),
          ]),
        )),
      ]),
    ]),
  },
  {
    title: 'Other border classes',
    containerProps: {
      size: '20rem',
    },
    matchItem: item => Object.keys(item.css).every(property => /^border(-(top|right|bottom|left))?(-(style|color|width))?$/.test(property)),
  },
  {
    title: 'Border radius',
    Component: BorderRadiusItem,
    containerProps: {
      size: '20rem',
    },
    matchItem: item => Object.keys(item.css).every(property => /^border(-(top-left|top-right|bottom-right|bottom-left))?-radius$/.test(property)),
  },
  {
    title: 'Box shadow',
    Component: BoxShadowItem,
    containerProps: {
      size: '20rem',
    },
    matchItem: matchExactProperties(['box-shadow']),
  },
  ...[
    ['top', ['margin-top']],
    ['bottom', ['margin-bottom']],
    ['vertical', ['margin-top', 'margin-bottom']],
    ['right', ['margin-right']],
    ['left', ['margin-left']],
    ['horizontal', ['margin-right', 'margin-left']],
  ].map(
    ([direction, properties]) => (
      {
        title: `Margin ${direction}`,
        Component: MarginItem,
        containerProps: {
          size: '20rem',
        },
        matchItem: (matchExactProperties(properties)),
      }
    ),
  ),
  {
    title: 'Margin all sides',
    Component: MarginItem,
    containerProps: {
      size: '20rem',
    },
    matchItem: matchOneOf([
      matchExactProperties(['margin']),
      matchExactProperties([
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',
      ]),
    ]),
  },
  ...[
    ['top', ['padding-top']],
    ['bottom', ['padding-bottom']],
    ['vertical', ['padding-top', 'padding-bottom']],
    ['right', ['padding-right']],
    ['left', ['padding-left']],
    ['horizontal', ['padding-right', 'padding-left']],
  ].map(
    ([direction, properties]) => (
      {
        title: `Padding ${direction}`,
        Component: PaddingItem,
        containerProps: {
          size: '20rem',
        },
        matchItem: (matchExactProperties(properties)),
      }
    ),
  ),
  {
    title: 'Padding all sides',
    Component: PaddingItem,
    containerProps: {
      size: '20rem',
    },
    matchItem: matchOneOf([
      matchExactProperties(['padding']),
      matchExactProperties([
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',
      ]),
    ]),
  },
  ...['height', 'min-height', 'max-height'].map(
    property => ({
      title: titleCase(property),
      Component: HeightItem,
      containerProps: {
        size: '20rem',
      },
      matchItem: matchExactProperties([property]),
    }),
  ),
  ...['width', 'min-width', 'max-width'].map(
    property => ({
      title: titleCase(property),
      Component: WidthItem,
      containerProps: {
        size: '100%',
      },
      matchItem: matchExactProperties([property]),
    }),
  ),
  {
    title: 'Display',
    containerProps: {
      size: '20rem',
    },
    matchItem: matchExactProperties(['display']),
  },
  {
    title: 'Flexbox',
    containerProps: {
      size: '20rem',
    },
    matchItem: matchOnlyProperties([
      'flex-wrap',
      'flex-flow',
      'flex-direction',
      'align-items',
      'align-content',
      'justify-content',
    ]),
  },
  {
    title: 'Flex item',
    containerProps: {
      size: '20rem',
    },
    matchItem: matchOnlyProperties([
      'flex',
      'flex-grow',
      'flex-shrink',
      'flex-basis',
      'align-self',
      'order',
    ]),
  },
  {
    title: 'Position',
    containerProps: {
      size: '20rem',
    },
    matchItem: matchExactProperties(['position']),
  },
  {
    title: 'Top, right, bottom, left',
    containerProps: {
      size: '20rem',
    },
    matchItem: matchOnlyProperties([
      'top',
      'right',
      'bottom',
      'left',
    ]),
  },
  {
    title: 'Overflow',
    containerProps: {
      size: '20rem',
    },
    matchItem: matchOnlyProperties(['overflow', 'overflow-x', 'overflow-y']),
  },
  {
    title: 'Other classes',
    matchItem: matchAny,
    displayValue: null,
  },
  // {
  //   title: 'Invalid classes',
  //   matchItem: item => item.invalid,
  //   matchPriority: 100,
  //   displayValue: null,
  // },
]);
