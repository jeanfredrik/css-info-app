import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styled from 'styled-components';

import { normalizeStyleObject } from './utils';

const OuterElement = styled.div`
`;

const FontStyleItem = ({
  css,
}) => (
  <OuterElement
    className={cx(
      'p2 rounded border',
    )}
    style={normalizeStyleObject(css)}
  >
    Lorem ipsum dolor sit amet,
    consectetur adipiscing elit.
    Pellentesque fermentum,
    tellus sit amet dignissim maximus,
    magna leo molestie felis,
    ut egestas arcu dui pretium nisl.
  </OuterElement>
);

FontStyleItem.propTypes = {
  css: PropTypes.object.isRequired,
};

export default FontStyleItem;
