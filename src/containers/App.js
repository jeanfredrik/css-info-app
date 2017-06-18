import { connect } from 'react-redux';
import {
  getMountedCSSFile,
} from '../selectors';
import {
} from '../actions';
import App from '../components/App';

export default connect(
  state => ({
    mountedCSSFile: getMountedCSSFile(state),
  }),
)(App);
