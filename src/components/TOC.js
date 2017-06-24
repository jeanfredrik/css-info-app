import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styled from 'styled-components';

const FileName = styled.h2`
  overflow-wrap: break-word;
`;

const TOC = ({
  categories,
  className,
  itemCount,
  cssFileName,
}) => (
  <div
    className={cx(
      className,
      'p2 border-box',
    )}
  >
    <FileName className="mt0 h4 lh-heading">
      {cssFileName}
    </FileName>
    <ul className="list-reset">
      {categories.map(({
        id,
        title,
        items,
      }) => (
        <li
          key={title}
          className=""
        >
          <a href={`#${id}`}>
            {title}
          </a>
          <span className="opacity-50">
            {` (${items.length})`}
          </span>
        </li>
      ))}
    </ul>
    <div className="mt1">Total: <strong>{itemCount}</strong> classes</div>
  </div>
);

TOC.defaultProps = {
  className: '',
};

TOC.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  itemCount: PropTypes.number.isRequired,
  cssFileName: PropTypes.string.isRequired,
};

export default styled(TOC)`
  width: 15rem;
`;
