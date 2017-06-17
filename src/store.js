import { compose, createStore } from 'redux';
import {
  pick,
} from 'lodash/fp';

import reducer from './reducers';
import persist from './middleware/persist';
import dispatchReturnState from './middleware/dispatchReturnState';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  persist(pick([
    'cssFiles',
    'lastPastedFileNumber',
  ])),
  dispatchReturnState,
);

const store = createStore(reducer, enhancer);

export default store;
