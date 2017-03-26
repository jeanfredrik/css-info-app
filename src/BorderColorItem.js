import React, { PropTypes } from 'react';
import cx from 'classnames';
import styled from 'styled-components';
import {
  values,
} from 'lodash/fp';

import { isWhite } from './utils';

const OuterElement = styled.div`
  height: 8rem;
  background-color: ${props => (
    props.darkBackground
    ? 'rgba(0, 0, 0, .125)'
    : 'transparent'
  )};
`;

const InnerElement = styled.div`
  width: 100%;
  height: 100%;
  border-style: solid;
  border-color: ${props => props.borderColor};
  border-width: .125rem;
`;

function getBorderColor(css) {
  return values(css)[0];
}

const useDark = isWhite;

const BorderColorItem = ({
  css,
}) => (
  <OuterElement
    className={cx(
      'rounded border border-box p2',
    )}
    darkBackground={useDark(getBorderColor(css))}
  >
    <InnerElement
      borderColor={getBorderColor(css)}
    />
  </OuterElement>
);

BorderColorItem.propTypes = {
  css: PropTypes.object.isRequired,
};

export default BorderColorItem;
