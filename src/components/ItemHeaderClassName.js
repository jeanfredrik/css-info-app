import React from 'react';
import PropTypes from 'prop-types';

const ItemHeaderClassName = ({
  name,
  state,
  media,
}) => (
  <span
    key={name}
    className="mr1 mb1 rounded overflow-hidden flex flex-shrink"
  >
    <span
      className="bg-silver p-half flex-none"
    >
      {name}
    </span>
    {
      state
      ? <span
        className="bg-blue white p-half flex-shrink"
      >
        {`:${state}`}
      </span>
      : null
    }
    {
      media
      ? <span
        className="bg-red white p-half flex-shrink"
      >
        {`@${media}`}
      </span>
      : null
    }
  </span>
);

ItemHeaderClassName.defaultProps = {
  state: null,
  media: null,
};

ItemHeaderClassName.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.string,
  media: PropTypes.string,
};

export default ItemHeaderClassName;
