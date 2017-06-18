import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider,
} from 'react-redux';
import qs from 'qs';

import App from './containers/App';
import store from './store';
import {
  handleInjectedCSSFile,
} from './actions';

if (window.injectedCSSFile) {
  store.dispatch(handleInjectedCSSFile(window.injectedCSSFile));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
