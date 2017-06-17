import {
  update,
  flow,
  set,
} from 'lodash/fp';
import shortid from 'shortid';

import {
  push,
  transformItems,
} from '../utils';
import {
  getNextPastedFileNumber,
  getCSSFileIndex,
} from '../selectors';
import parseCSS from '../parseCSS';

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
    case 'MOUNT_CSS_FILE': {
      const index = getCSSFileIndex(state)(action.cssFileId);
      const cssFile = state.cssFiles[index];
      let items = [];
      let error = null;
      try {
        items = transformItems(parseCSS(cssFile.name, cssFile.content));
      } catch (thrownError) {
        error = {
          type: 'parse',
          message: thrownError.message,
        };
      }
      return flow([
        set(['cssFiles', index, 'error'], error),
        set('mountedCSSFile', {
          id: action.cssFileId,
          items,
          error,
        }),
      ])(state);
    }
    case 'UNMOUNT_CSS_FILE': {
      return flow([
        set('mountedCSSFile', null),
      ])(state);
    }
    default:
      return state;
  }
};
