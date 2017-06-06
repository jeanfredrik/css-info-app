import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styled from 'styled-components';

import { firstValue } from './utils';

const OuterElement = styled.div`
  background-color: rgba(0,0,0,.125);
  min-width: 2rem;
`;

const InnerElement = styled.div`
  background: #89b5c1;
  border: 1px dashed rgba(0,0,0,.5);
  box-sizing: border-box;
  flex: none;
  min-height: 2rem;
`;

const WidthItem = ({
  css,
}) => {
  const width = firstValue(css);
  return (
    <OuterElement
      className={cx(
        'border-box overflow-hidden flex-auto',
      )}
    >
      <InnerElement
        style={{
          width,
        }}
      />
    </OuterElement>
  );
};

WidthItem.propTypes = {
  css: PropTypes.object.isRequired,
};

export default WidthItem;
