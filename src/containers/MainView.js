import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import windowSize from 'react-window-size';

import {
  getMountedCSSFile,
  getMountedCSSFileItems,
} from '../selectors';
import {
  unmountCSSFile,
  toggleTOC,
} from '../actions';
import MainView from '../components/MainView';
import categories from '../categories';
import {
  prepareItems,
} from '../utils';

const categorizeItems = prepareItems(categories);

const connector = connect(
  state => ({
    cssFileName: getMountedCSSFile(state).name,
    items: getMountedCSSFileItems(state),
    showTOC: state.showTOC,
  }),
  null,
  (stateProps, { dispatch }, ownProps) => ({
    ...stateProps,
    ...ownProps,
    showTOC: stateProps.showTOC && ownProps.windowWidth >= 768,
    onLogoClick(event) {
      event.preventDefault();
      dispatch(unmountCSSFile());
    },
    onTOCToggleClick(event) {
      event.preventDefault();
      dispatch(toggleTOC());
    },
  }),
);

class MainViewContainer extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  };
  constructor(...args) {
    super(...args);
    autobind(this);
  }
  state = {
    search: '',
    showAllStateClassNames: false,
    showAllMediaClassNames: false,
  };
  handleSearchChange(event) {
    const value = event.target.value;
    this.setState(state => ({
      ...state,
      search: value,
    }));
  }
  handleToggleShowAllStateClassNamesButtonClick(event) {
    event.preventDefault();
    this.setState(state => ({
      ...state,
      showAllStateClassNames: !state.showAllStateClassNames,
    }));
  }
  handleToggleShowAllMediaClassNamesButtonClick(event) {
    event.preventDefault();
    this.setState(state => ({
      ...state,
      showAllMediaClassNames: !state.showAllMediaClassNames,
    }));
  }
  render() {
    const {
      items,
      ...props
    } = this.props;
    const {
      search,
      showAllStateClassNames,
      showAllMediaClassNames,
    } = this.state;
    return (
      <MainView
        itemCount={items.length}
        categories={categorizeItems(search, items)}
        search={search}
        showAllStateClassNames={showAllStateClassNames}
        showAllMediaClassNames={showAllMediaClassNames}
        onSearchChange={this.handleSearchChange}
        onToggleShowAllStateClassNamesButtonClick={
          this.handleToggleShowAllStateClassNamesButtonClick
        }
        onToggleShowAllMediaClassNamesButtonClick={
          this.handleToggleShowAllMediaClassNamesButtonClick
        }
        {...props}
      />
    );
  }
}

export default windowSize(connector(MainViewContainer));
