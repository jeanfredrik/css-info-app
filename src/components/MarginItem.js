import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styled from 'styled-components';
import {
  mapKeys,
} from 'lodash/fp';

import { normalizeStyleObject } from '../utils';

const OuterElement = styled.div`
  background-color: #facc9a;
`;

const InnerElement = styled.div`
  min-width: 2rem;
  min-height: 2rem;
  border: 1px dashed rgba(0,0,0,.5);
  box-sizing: border-box;
  background: #89b5c1;
`;

const MarginItem = ({
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

MarginItem.propTypes = {
  css: PropTypes.object.isRequired,
};

export default MarginItem;
