/* eslint-disable import/prefer-default-export */

import { createSelector } from 'reselect';
import {
  memoize,
  sortBy,
  findIndex,
} from 'lodash/fp';

export const getNextPastedFileNumber = createSelector(
  state => state.lastPastedFileNumber,
  lastPastedFileNumber => (lastPastedFileNumber || 0) + 1,
);

export const getSortedCSSFiles = createSelector(
  state => state.cssFiles,
  cssFiles => sortBy(cssFile => cssFile.createdAt, cssFiles),
);

export const getCSSFile = createSelector(
  state => state.cssFiles,
  cssFiles => memoize(
    cssFileId => cssFiles.find(cssFile => cssFile.id === cssFileId),
  ),
);

export const getCSSFileIndex = createSelector(
  state => state.cssFiles,
  cssFiles => memoize(
    cssFileId => findIndex(cssFile => cssFile.id === cssFileId, cssFiles),
  ),
);

export const getLastCSSFileId = state => state.lastCSSFileId;

export const hasMountedCSSFile = createSelector(
  state => state.mountedCSSFile,
  mountedCSSFile => !!mountedCSSFile,
);

export const getMountedCSSFile = createSelector(
  state => state.mountedCSSFileId,
  state => state.cssFiles,
  (mountedCSSFileId, cssFiles) => (
    mountedCSSFileId
    ? cssFiles.find(cssFile => cssFile.id === mountedCSSFileId)
    : null
  ),
);

export const getMountedCSSFileItems = state => state.mountedCSSFileItems || [];
