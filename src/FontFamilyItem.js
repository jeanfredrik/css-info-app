import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styled from 'styled-components';

import { normalizeStyleObject } from './utils';

const OuterElement = styled.div`
`;
const InnerElement = styled.div`
  font-size: ${props => `${props.fontSize}rem`};
  white-space: nowrap;
  overflow: hidden;
  line-height: 1em;
  padding-top: .25rem;
  padding-bottom: .25rem;
`;

const FontFamilyItem = ({
  css,
}) => (
  <OuterElement
    className={cx(
      'p2 rounded border',
    )}
    style={normalizeStyleObject(css)}
  >
    <InnerElement fontSize={3}>
      Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.
    </InnerElement>
    <InnerElement fontSize={2}>
      Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.
      Pellentesque fermentum,
    </InnerElement>
    <InnerElement fontSize={1.5}>
      Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.
      Pellentesque fermentum,
      tellus sit amet dignissim maximus,
    </InnerElement>
    <InnerElement fontSize={1}>
      Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.
      Pellentesque fermentum,
      tellus sit amet dignissim maximus,
      magna leo molestie felis,
      ut egestas arcu dui pretium nisl.
    </InnerElement>
    <InnerElement fontSize={0.75}>
      Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.
      Pellentesque fermentum,
      tellus sit amet dignissim maximus,
      magna leo molestie felis,
      ut egestas arcu dui pretium nisl.
    </InnerElement>
  </OuterElement>
);

FontFamilyItem.propTypes = {
  css: PropTypes.object.isRequired,
};

export default FontFamilyItem;
