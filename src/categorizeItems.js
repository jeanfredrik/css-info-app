import {
  findIndex,
  flow,
  groupBy,
  map,
  mapValues,
  sortBy,
  toArray,
  kebabCase,
} from 'lodash/fp';

const mapValuesWithKey = mapValues.convert({
  cap: false,
});

const mapWithKey = map.convert({
  cap: false,
});

const transformCategories = flow([
  mapWithKey((category, index) => ({
    matchPriority: 0,
    ...category,
    index,
  })),
]);


const categorizeItems = (categories) => {
  const categoriesByMatchPriority = flow([
    transformCategories,
    sortBy(
      category => -category.matchPriority,
    ),
  ])(categories);
  return flow([
    groupBy(
      item =>
      findIndex(
        category => category.matchItem(item),
        categoriesByMatchPriority,
      ),
    ),
    mapValuesWithKey(
      (value, key) =>
      ({
        ...categoriesByMatchPriority[key],
        id: kebabCase(categoriesByMatchPriority[key].title),
        items: value,
      }),
    ),
    toArray,
    sortBy('index'),
  ]);
};

export default categorizeItems;
