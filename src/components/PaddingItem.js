import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styled from 'styled-components';
import {
  mapKeys,
} from 'lodash/fp';

import { normalizeStyleObject } from '../utils';

const OuterElement = styled.div`
  background-color: #c2d086;
  border: 1px dashed rgba(0,0,0,.5);
`;

const InnerElement = styled.div`
  min-width: 2rem;
  min-height: 2rem;
  box-sizing: border-box;
  background: #89b5c1;
`;

const PaddingItem = ({
  css,
}) => (
  <OuterElement
    className={cx(
      'border-box overflow-hidden',
    )}
    style={
      normalizeStyleObject(
        mapKeys(
          key => key.replace(/margin/, 'padding'),
          css,
        ),
      )
    }
  >
    <InnerElement />
  </OuterElement>
);

PaddingItem.propTypes = {
  css: PropTypes.object.isRequired,
};

export default PaddingItem;
