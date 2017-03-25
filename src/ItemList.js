import React, { PropTypes } from 'react';
import {
  range,
} from 'lodash/fp';
import Item from './Item';
import ItemContainer from './ItemContainer';

const ItemList = ({
  Component,
  items,
  containerProps,
  displayValue,
  showAllStateClassNames,
  showAllMediaClassNames,
}) => (
  <ul className="list-reset flex flex-wrap mn1">
    {items.map(({
      key,
      classNames,
      css,
      // invalid,
    }) => (
      <Item
        key={key}
        {...{
          css,
          classNames,
          containerProps,
          displayValue,
          Component,
          showAllStateClassNames,
          showAllMediaClassNames,
        }}
      />
    ))}
    {range(0, 6).map(index => (
      <ItemContainer
        key={`dummy-${index}`}
        className="flex-grow"
        {...containerProps}
      />
    ))}
  </ul>
);

ItemList.defaultProps = {
  displayValue: null,
  showAllStateClassNames: false,
  showAllMediaClassNames: false,
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  containerProps: PropTypes.object.isRequired,
  displayValue: PropTypes.func,
  showAllStateClassNames: PropTypes.bool,
  showAllMediaClassNames: PropTypes.bool,
  Component: PropTypes.oneOfType([
    PropTypes.instanceOf(React.Component),
    PropTypes.func,
  ]).isRequired,
};

export default ItemList;
