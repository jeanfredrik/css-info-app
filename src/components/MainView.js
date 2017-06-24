import React from 'react';
import PropTypes from 'prop-types';

import CategoryList from './CategoryList';
import Header from './Header';
// import Icon from './Icon';
import TOC from './TOC';
import TOCToggle from './TOCToggle';

const MainView = ({
  categories,
  cssFileName,
  itemCount,
  onLogoClick,
  onSearchChange,
  onTOCToggleClick,
  onToggleShowAllMediaClassNamesButtonClick,
  onToggleShowAllStateClassNamesButtonClick,
  search,
  showAllMediaClassNames,
  showAllStateClassNames,
  showTOC,
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
    <div className="flex-auto flex items-stretch">
      {
        showTOC
        ? (
          <TOC
            categories={categories}
            className="flex-none overflow-y-auto border-right"
            cssFileName={cssFileName}
            itemCount={itemCount}
          />
        )
        : null
      }
      <TOCToggle
        className="flex-none self-center"
        expanded={showTOC}
        onClick={onTOCToggleClick}
      />
      <CategoryList
        categories={categories}
        className="flex-auto overflow-scroll"
        showAllMediaClassNames={showAllMediaClassNames}
        showAllStateClassNames={showAllStateClassNames}
      />
    </div>
  </div>
);

MainView.defaultProps = {
  className: '',
  search: '',
  showAllMediaClassNames: false,
  showAllStateClassNames: false,
};

MainView.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  cssFileName: PropTypes.string.isRequired,
  itemCount: PropTypes.number.isRequired,
  onLogoClick: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onTOCToggleClick: PropTypes.func.isRequired,
  onToggleShowAllMediaClassNamesButtonClick: PropTypes.func.isRequired,
  onToggleShowAllStateClassNamesButtonClick: PropTypes.func.isRequired,
  search: PropTypes.string,
  showAllMediaClassNames: PropTypes.bool,
  showAllStateClassNames: PropTypes.bool,
  showTOC: PropTypes.bool.isRequired,
};

export default MainView;
