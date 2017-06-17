/* eslint-disable import/prefer-default-export */

export function createCSSFileFromText(text) {
  return {
    type: 'CREATE_CSS_FILE_FROM_TEXT',
    text,
  };
}

export function mountCSSFile(cssFileId) {
  return {
    type: 'MOUNT_CSS_FILE',
    cssFileId,
  };
}

export function unmountCSSFile() {
  return {
    type: 'UNMOUNT_CSS_FILE',
  };
}
