import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styled from 'styled-components';

import { isWhite } from '../utils';

const OuterElement = styled.div`
  background-color: ${props => (
    props.darkBackground
    ? 'rgba(0, 0, 0, .125)'
    : 'transparent'
  )};
`;

const ColorItem = ({
  css,
}) => (
  <OuterElement
    className={cx(
      // Color(css.color).dark() ? 'bg-white' : 'bg-black',
      'p2 rounded border',
    )}
    darkBackground={isWhite(css.color)}
    style={{
      color: css.color,
    }}
  >
    Lorem ipsum dolor sit amet,
    consectetur adipiscing elit.
    Pellentesque fermentum,
    tellus sit amet dignissim maximus,
    magna leo molestie felis,
    ut egestas arcu dui pretium nisl.
  </OuterElement>
);

ColorItem.propTypes = {
  css: PropTypes.object.isRequired,
};

export default ColorItem;
