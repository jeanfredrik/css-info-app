import React, { PropTypes } from 'react';
import cx from 'classnames';

import ItemList from './ItemList';

const CategoryList = ({
  className,
  categories,
  showAllStateClassNames,
  showAllMediaClassNames,
}) => (
  <div
    className={cx(
      className,
    )}
  >
    <ul className="list-reset m0">
      {categories.map(({
        title,
        items,
        Component,
        containerProps = {},
        displayValue,
      }) => (
        <li
          key={title}
          className="p2"
        >
          <h2
            className="mt1 mb2"
          >
            {title}
          </h2>
          <ItemList
            items={items}
            Component={Component}
            containerProps={containerProps}
            displayValue={displayValue}
            showAllStateClassNames={showAllStateClassNames}
            showAllMediaClassNames={showAllMediaClassNames}
          />
        </li>
      ))}
    </ul>
  </div>
);

CategoryList.defaultProps = {
  className: '',
  showAllStateClassNames: false,
  showAllMediaClassNames: false,
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  showAllStateClassNames: PropTypes.bool,
  showAllMediaClassNames: PropTypes.bool,
};

export default CategoryList;
