import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

import {
  getMountedCSSFile,
} from '../selectors';
import {
  unmountCSSFile,
} from '../actions';
import MainView from '../components/MainView';
import categories from '../categories';
import {
  prepareItems,
} from '../utils';

const categorizeItems = prepareItems(categories);

const connector = connect(
  state => ({
    ...getMountedCSSFile(state),
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

class MainViewContainer extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onLogoClick: PropTypes.func.isRequired,
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
      onLogoClick,
    } = this.props;
    const {
      search,
      showAllStateClassNames,
      showAllMediaClassNames,
    } = this.state;
    return (
      <MainView
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
        onLogoClick={onLogoClick}
      />
    );
  }
}

export default connector(MainViewContainer);
