import { connect } from 'react-redux';

import {
  getSortedCSSFiles,
  getLastCSSFileId,
} from '../selectors';
import {
  createCSSFileFromText,
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
    onCreateCSSFileFromTextFormSubmit({ text }) {
      const state = dispatch(createCSSFileFromText(text));
      dispatch(mountCSSFile(getLastCSSFileId(state)));
    },
    onCSSFileClick(event) {
      event.preventDefault();
      const cssFileId = event.currentTarget.dataset.id;
      dispatch(mountCSSFile(cssFileId));
    },
  }),
)(StartView);
