import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styled from 'styled-components';

import { firstValue } from '../utils';

const OuterElement = styled.div`
  min-height: ${props => (props.isRelative ? '8rem' : '2rem')};
  min-width: 2rem;
  background-color: rgba(0,0,0,.125);
`;

const InnerElement = styled.div`
  box-sizing: border-box;
  background: #89b5c1;
  border: 1px dashed rgba(0,0,0,.5);
  flex: none;
`;

const HeightItem = ({
  css,
}) => {
  const height = firstValue(css);
  const isRelative = /%$/.test(height);
  return (
    <OuterElement
      className={cx(
        'border-box overflow-hidden flex-auto',
        isRelative && 'relative',
      )}
      isRelative={isRelative}
    >
      <InnerElement
        className={cx(
          isRelative && 'absolute top-0 right-0 left-0',
        )}
        style={{
          height,
        }}
      />
    </OuterElement>
  );
};

HeightItem.propTypes = {
  css: PropTypes.object.isRequired,
};

export default HeightItem;
