import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

const MountLoadingView = ({
  cssFile,
  onLogoClick,
}) => (
  <div className="flex flex-column height-100">
    <Header onLogoClick={onLogoClick} />
    <div
      className="flex-auto overflow-scroll flex justify-center items-center"
    >
      <div className="flex flex-column items-start">
        <div className="gray">
          Fetching <em>{cssFile.name}</em>
        </div>
      </div>
    </div>
  </div>
);

MountLoadingView.defaultProps = {};

MountLoadingView.propTypes = {
  cssFile: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  onLogoClick: PropTypes.func.isRequired,
};

export default MountLoadingView;
