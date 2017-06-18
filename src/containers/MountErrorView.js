import { connect } from 'react-redux';

import {
  getMountedCSSFile,
} from '../selectors';
import {
  unmountCSSFile,
} from '../actions';
import MountErrorView from '../components/MountErrorView';

const connector = connect(
  state => ({
    cssFile: getMountedCSSFile(state),
  }),
  null,
  (stateProps, { dispatch }, ownProps) => ({
    ...stateProps,
    ...ownProps,
    onLogoClick(event) {
      event.preventDefault();
      dispatch(unmountCSSFile());
    },
  }),
);

export default connector(MountErrorView);
