import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styled from 'styled-components';

import { firstValue, updateState } from './utils';

const OuterElement = styled.div`
  background-color: ${props => (
    props.darkBackground
    ? 'rgba(0, 0, 0, .125)'
    : 'transparent'
  )};
`;

const InnerElement = styled.div`
  max-height: ${props => `${props.lineHeight * Math.floor(150 / props.lineHeight)}px`};
  overflow: hidden;
`;

class FontSizeItem extends Component {
  state = {
    calculatedLineHeight: null,
  };
  updateHeight(element) {
    if (element && this.state.calculatedLineHeight == null) {
      updateState(this, {
        calculatedLineHeight: {
          $set: window.getComputedStyle(element).lineHeight.replace(/px/, ''),
        },
      });
    }
  }
  render() {
    const {
      css,
    } = this.props;
    const {
      calculatedLineHeight,
    } = this.state;
    const fontSize = firstValue(css);
    return (
      <OuterElement
        className={cx(
          'p2 rounded border',
        )}
        style={{ fontSize }}
      >
        <InnerElement
          lineHeight={calculatedLineHeight}
        >
          <div
            ref={element => this.updateHeight(element)}
          >
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
            Pellentesque fermentum,
            tellus sit amet dignissim maximus,
            magna leo molestie felis,
            ut egestas arcu dui pretium nisl.
          </div>
        </InnerElement>
      </OuterElement>
    );
  }
}

FontSizeItem.propTypes = {
  css: PropTypes.object.isRequired,
};

export default FontSizeItem;
