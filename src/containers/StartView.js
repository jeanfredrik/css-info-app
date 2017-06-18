import { connect } from 'react-redux';

import {
  getSortedCSSFiles,
  getLastCSSFileId,
} from '../selectors';
import {
  createCSSFileFromText,
  createCSSFileFromURL,
  mountCSSFile,
} from '../actions';
import StartView from '../components/StartView';

export default connect(
  state => ({
    cssFiles: getSortedCSSFiles(state),
  }),
  null,
  (stateProps, { dispatch }, ownProps) => ({
    ...stateProps,
    ...ownProps,
    async onCreateCSSFileFromTextFormSubmit({ text }) {
      const state = dispatch(createCSSFileFromText(text));
      const cssFileId = getLastCSSFileId(state);
      await dispatch(mountCSSFile(cssFileId));
    },
    async onCreateCSSFileFromURLFormSubmit({ url }) {
      const state = dispatch(createCSSFileFromURL(url));
      const cssFileId = getLastCSSFileId(state);
      await dispatch(mountCSSFile(cssFileId));
      // await dispatch(fetchCSSFile(cssFileId));
    },
    onCSSFileClick(event) {
      event.preventDefault();
      const cssFileId = event.currentTarget.dataset.id;
      dispatch(mountCSSFile(cssFileId));
    },
  }),
)(StartView);
