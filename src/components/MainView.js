import React from 'react';
import PropTypes from 'prop-types';

import CategoryList from './CategoryList';
import Header from './Header';

const MainView = ({
  search,
  onSearchChange,
  categories,
  onToggleShowAllStateClassNamesButtonClick,
  onToggleShowAllMediaClassNamesButtonClick,
  onLogoClick,
  showAllStateClassNames,
  showAllMediaClassNames,
}) => (
  <div className="flex flex-column height-100">
    <Header onLogoClick={onLogoClick}>
      <input
        type="text"
        className="input flex-auto mx1"
        value={search}
        onChange={onSearchChange}
        placeholder="Search…"
      />
      <div className="flex mrn1">
        <button
          className="bg-blue focus-outline-blue cursor-pointer white rounded mr1 monospace py-half px2 h3"
          onClick={onToggleShowAllStateClassNamesButtonClick}
        >
          :
        </button>
        <button
          className="bg-red focus-outline-red cursor-pointer white rounded mr1 monospace py-half px2 h3"
          onClick={onToggleShowAllMediaClassNamesButtonClick}
        >
          @
        </button>
      </div>
    </Header>
    <CategoryList
      categories={categories}
      className="flex-auto overflow-scroll"
      showAllStateClassNames={showAllStateClassNames}
      showAllMediaClassNames={showAllMediaClassNames}
    />
  </div>
);

MainView.defaultProps = {
  className: '',
  showAllStateClassNames: false,
  showAllMediaClassNames: false,
  search: '',
};

MainView.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  showAllStateClassNames: PropTypes.bool,
  showAllMediaClassNames: PropTypes.bool,
  search: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  onToggleShowAllStateClassNamesButtonClick: PropTypes.func.isRequired,
  onToggleShowAllMediaClassNamesButtonClick: PropTypes.func.isRequired,
  onLogoClick: PropTypes.func.isRequired,
};

export default MainView;