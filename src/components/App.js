import React from 'react';
import PropTypes from 'prop-types';

import 'amino-css/dist/amino.css';

import StartView from '../containers/StartView';
import MainView from '../containers/MainView';
import MountErrorView from '../containers/MountErrorView';

const App = ({
  mountedCSSFile,
}) => {
  if (!mountedCSSFile) {
    return (
      <StartView />
    );
  }
  if (mountedCSSFile.error) {
    return (
      <MountErrorView />
    );
  }
  return (
    <MainView />
  );
};

App.propTypes = {
  mountedCSSFile: PropTypes.any,
};

App.defaultProps = {
  mountedCSSFile: null,
};

export default App;
