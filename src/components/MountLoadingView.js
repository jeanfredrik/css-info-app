import React from 'react';
import PropTypes from 'prop-types';

const MountLoadingView = ({
  cssFile,
  onLogoClick,
}) => (
  <div className="flex flex-column height-100">
    <div className="flex-none border-bottom flex items-center p1">
      <h1 className="h3 regular my0">
        <a href="" className="link-reset block p1" onClick={onLogoClick}>
          <span style={{ paddingRight: '.125em' }}>css</span>
          <span style={{ paddingLeft: '.125em', borderLeft: '1px solid currentColor' }}>info</span></a>
      </h1>
    </div>
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
