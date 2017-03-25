import React, { PropTypes } from 'react';
import cx from 'classnames';
import styled from 'styled-components';

import { isWhite, normalizeStyleObject, firstColorNodeValue } from './utils';

const OuterElement = styled.div`
  height: 8rem;
  background-color: ${props => (
    props.darkBackground
    ? 'rgba(0, 0, 0, .0625)'
    : 'transparent'
  )};
`;

const InnerElement = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, .0625);
  border-color: black;
  border-style: solid;
  border-width: 0;
`;


function getBorderColor(css) {
  const properties = Object.keys(css);
  const colorProperty = properties.find(property => /color/.test(property));
  if (colorProperty) {
    return css[colorProperty];
  }
  const value = css[properties[0]];
  return firstColorNodeValue(value);
}

const useDark = isWhite;

const BorderItem = ({
  css,
}) => (
  <OuterElement
    className={cx(
      'rounded border border-box p2',
    )}
    darkBackground={useDark(getBorderColor(css))}
  >
    <InnerElement
      style={normalizeStyleObject(css)}
      darkBackground={useDark(getBorderColor(css))}
    />
  </OuterElement>
);

BorderItem.propTypes = {
  css: PropTypes.object.isRequired,
};

export default BorderItem;
