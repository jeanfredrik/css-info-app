import reduceReducers from 'reduce-reducers';
import {
  assign,
  update,
} from 'lodash/fp';

import cssFiles from './cssFiles';
import initialState from '../initialState';

export default reduceReducers(

  cssFiles,

  (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_TOC':
        return update(['showTOC'], value => !value, state);
      case 'PATCH_FROM_LOCAL_STORAGE':
        return assign(state, action.values);
      default:
        return state;
    }
  },

);
