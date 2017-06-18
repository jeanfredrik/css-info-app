/* eslint-disable import/prefer-default-export */

import qs from 'qs';

import {
  getCSSFile,
  getLastCSSFileId,
} from '../selectors';
import fetchCSSFile from '../lib/fetchCSSFile';

export function createCSSFileFromText(text) {
  return {
    type: 'CREATE_CSS_FILE_FROM_TEXT',
    text,
  };
}

export function createCSSFileFromURL(url) {
  return {
    type: 'CREATE_CSS_FILE_FROM_URL',
    url,
  };
}

export function unmountCSSFile() {
  return async (dispatch) => {
    dispatch({
      type: 'UNMOUNT_CSS_FILE',
    });
    window.history.replaceState(null, '', '/');
  };
}

export function updateCSSFile(cssFileId, values) {
  return {
    type: 'UPDATE_CSS_FILE',
    cssFileId,
    values,
  };
}

export function mountCSSFile(cssFileId) {
  return async (dispatch, getState) => {
    dispatch({
      type: 'MOUNT_CSS_FILE',
      cssFileId,
    });
    let cssFile = getCSSFile(getState())(cssFileId);
    if (cssFile.url) {
      window.history.replaceState(null, '', `/?${qs.stringify({ url: cssFile.url })}`);
      dispatch(updateCSSFile(cssFileId, {
        loading: true,
      }));
      try {
        cssFile = getCSSFile(getState())(cssFileId);
        const content = await fetchCSSFile(cssFile.url);
        dispatch(updateCSSFile(cssFileId, {
          loading: false,
          content,
        }));
      } catch (thrownError) {
        dispatch(updateCSSFile(cssFileId, {
          error: {
            loading: false,
            type: 'fetch',
            message: thrownError.message,
          },
        }));
      }
    }
    cssFile = getCSSFile(getState())(cssFileId);
    if (!cssFile.error) {
      dispatch({
        type: 'PARSE_CSS_FILE',
        cssFileId,
      });
    }
  };
}

export function handleInjectedCSSFile(cssFile) {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_CSS_FILE',
      cssFile,
    });
    dispatch(mountCSSFile(cssFile.id));
  };
}

export function handleURLParam(url) {
  return async (dispatch) => {
    const state = dispatch(createCSSFileFromURL(url));
    const cssFileId = getLastCSSFileId(state);
    await dispatch(mountCSSFile(cssFileId));
  };
}
