import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styled from 'styled-components';
import Color from 'color';

import { normalizeStyleObject, firstColorNodeValue } from '../utils';

const OuterElement = styled.div`
  height: 8rem;
`;

const InnerElement = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const BoxShadowItem = ({
  css,
}) => {
  const isDark = Color(firstColorNodeValue(css['box-shadow']) || 'black').dark();
  return (
    <OuterElement
      className={cx(
        'rounded border border-box p2',
        isDark ? 'bg-white' : 'bg-black',
      )}
    >
      <InnerElement
        style={normalizeStyleObject(css)}
        className={cx(
          'rounded',
          isDark ? 'bg-white' : 'bg-black',
        )}
      />
    </OuterElement>
  );
};

BoxShadowItem.propTypes = {
  css: PropTypes.object.isRequired,
};

export default BoxShadowItem;
