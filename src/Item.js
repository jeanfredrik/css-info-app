import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

import {
  updateStateWith,
} from './utils';
import ItemContainer from './ItemContainer';
import ItemHeader from './ItemHeader';

class Item extends Component {
  static propTypes = {
    classNames: PropTypes.arrayOf(PropTypes.object).isRequired,
    css: PropTypes.object.isRequired,
    containerProps: PropTypes.object.isRequired,
    displayValue: PropTypes.func,
    showAllStateClassNames: PropTypes.bool.isRequired,
    showAllMediaClassNames: PropTypes.bool.isRequired,
    Component: PropTypes.func.isRequired,
  };
  static defaultProps = {
    displayValue: null,
  };
  constructor(props) {
    super(props);
    autoBind(this);
  }
  state = {
    showStateClassNames: false,
    showMediaClassNames: false,
  };
  async handleToggleStateClassNamesButtonClick(event) {
    event.preventDefault();
    await updateStateWith(this, state => ({
      showStateClassNames: { $set: !state.showStateClassNames },
    }));
  }
  async handleToggleMediaClassNamesButtonClick(event) {
    event.preventDefault();
    await updateStateWith(this, state => ({
      showMediaClassNames: { $set: !state.showMediaClassNames },
    }));
  }
  render() {
    const {
      classNames,
      css,
      containerProps,
      displayValue,
      showAllStateClassNames,
      showAllMediaClassNames,
      Component: ItemComponent,
    } = this.props;
    const {
      showStateClassNames,
      showMediaClassNames,
    } = this.state;
    return (
      <ItemContainer
        className="flex-grow border-box p1"
        {...containerProps}
      >
        <ItemHeader
          {...{
            classNames,
            showStateClassNames: showAllStateClassNames || showStateClassNames,
            showMediaClassNames: showAllMediaClassNames || showMediaClassNames,
            displayedValue: displayValue && displayValue(css),
            onToggleStateClassNamesButtonClick: this.handleToggleStateClassNamesButtonClick,
            onToggleMediaClassNamesButtonClick: this.handleToggleMediaClassNamesButtonClick,
          }}
        />
        <ItemComponent
          css={css}
        />
      </ItemContainer>
    );
  }
}

export default Item;
