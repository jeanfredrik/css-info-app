import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styled from 'styled-components';

import {
  flow,
  fromPairs,
  keys,
  map,
} from 'lodash/fp';

import { normalizeStyleObject } from './utils';

const OuterElement = styled.div`
  height: 8rem;
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

const BorderStyleItem = ({
  css,
}) => (
  <OuterElement
    className={cx(
      'rounded border border-box p2',
    )}
  >
    <InnerElement
      style={normalizeStyleObject({
        ...css,
        ...flow([
          keys,
          map(key => key.replace(/^(border(?:-\w+)?)-style$/, '$1-width')),
          map(key => [key, '.125rem']),
          fromPairs,
        ])(css),
      })}
    />
  </OuterElement>
);

BorderStyleItem.propTypes = {
  css: PropTypes.object.isRequired,
};

export default BorderStyleItem;
