import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  pick,
} from 'lodash/fp';

import reducer from './reducers';
import persist from './middleware/persist';
import dispatchReturnState from './middleware/dispatchReturnState';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  persist(pick([
    'cssFiles',
    'lastPastedFileNumber',
    'showTOC',
  ])),
  dispatchReturnState,
);

const store = createStore(reducer, enhancer);

export default store;
