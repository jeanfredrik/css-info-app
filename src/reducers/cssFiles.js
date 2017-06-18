import {
  update,
  flow,
  filter,
  set,
  assign,
} from 'lodash/fp';
import shortid from 'shortid';

import {
  push,
  truncateURL,
} from '../utils';
import {
  getNextPastedFileNumber,
  getCSSFileIndex,
} from '../selectors';

export default (state, action) => {
  switch (action.type) {
    case 'CREATE_CSS_FILE_FROM_TEXT': {
      const pastedFileNumber = getNextPastedFileNumber(state);
      const newCSSFile = {
        id: shortid.generate(),
        name: `Pasted file #${pastedFileNumber}`,
        content: action.text,
        createdAt: Date.now(),
      };
      return flow([
        // XXX: We should not need to check for other css files with same id
        // update('cssFiles', filter(cssFile => cssFile.id !== newCSSFile.id)),
        update('cssFiles', push(newCSSFile)),
        set('lastPastedFileNumber', pastedFileNumber),
        set('lastCSSFileId', newCSSFile.id),
      ])(state);
    }
    case 'CREATE_CSS_FILE_FROM_URL': {
      const newCSSFile = {
        id: action.url,
        url: action.url,
        name: truncateURL(action.url, 30),
        createdAt: Date.now(),
      };
      return flow([
        // Remove existing file with same id (url)
        update('cssFiles', filter(cssFile => cssFile.id !== newCSSFile.id)),
        update('cssFiles', push(newCSSFile)),
        set('lastCSSFileId', newCSSFile.id),
      ])(state);
    }
    case 'UPDATE_CSS_FILE': {
      const index = getCSSFileIndex(state)(action.cssFileId);
      return flow([
        update(['cssFiles', index], cssFile => assign(cssFile, action.values)),
      ])(state);
    }
    case 'MOUNT_CSS_FILE': {
      return flow([
        set('mountedCSSFileId', action.cssFileId),
      ])(state);
    }
    case 'UNMOUNT_CSS_FILE': {
      return flow([
        set('mountedCSSFileId', null),
      ])(state);
    }
    default:
      return state;
  }
};
