import React from 'react';
import PropTypes from 'prop-types';

import CategoryList from './CategoryList';

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
    <div className="flex-none border-bottom flex items-center p1">
      <h1 className="h3 regular my0">
        <a href="" className="link-reset block p1" onClick={onLogoClick}>
          <span style={{ paddingRight: '.125em' }}>css</span>
          <span style={{ paddingLeft: '.125em', borderLeft: '1px solid currentColor' }}>info</span></a>
      </h1>
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
    </div>
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
