import reduceReducers from 'reduce-reducers';
import {
  assign,
} from 'lodash/fp';

import cssFiles from './cssFiles';
import initialState from '../initialState';

export default reduceReducers(

  cssFiles,

  (state = initialState, action) => {
    switch (action.type) {
      case 'PATCH_FROM_LOCAL_STORAGE':
        return assign(state, action.values);
      default:
        return state;
    }
  },

);
