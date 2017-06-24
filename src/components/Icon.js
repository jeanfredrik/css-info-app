import React from 'react';
import PropTypes from 'prop-types';

const icons = {
  'ion-android-arrow-dropleft': {
    render: () => (
      <polygon points="320,128 192,256 320,384" />
    ),
    size: 512,
  },
  'ion-android-arrow-dropright': {
    render: () => (
      <polygon points="192,128 320,256 192,384" />
    ),
    size: 512,
  },
};

const Icon = ({
  name,
  size,
  ...props
}) => {
  const { render: Component, size: intrinsicSize } = icons[name];
  return (
    <svg
      viewBox={`0 0 ${intrinsicSize} ${intrinsicSize}`}
      style={{
        width: size,
        height: size,
      }}
      fill="currentColor"
      {...props}
    >
      <Component />
    </svg>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};

Icon.defaultProps = {
  size: '1em',
};

export default Icon;
