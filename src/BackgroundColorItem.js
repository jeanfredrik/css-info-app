import React, { PropTypes } from 'react';
import cx from 'classnames';

const BackgroundColorItem = ({
  css,
}) => (
  <div
    className={cx(
      'rounded border',
    )}
    style={{
      backgroundImage: [
        `linear-gradient(${css['background-color']}, ${css['background-color']})`,
        'linear-gradient(to right, white 0%, white 50%, black 50%, black 100%)',
      ].join(','),
      backgroundPosition: 'center center',
      backgroundSize: '150% 150%',
      height: '8rem',
    }}
  />
);

BackgroundColorItem.propTypes = {
  css: PropTypes.object.isRequired,
};

export default BackgroundColorItem;
