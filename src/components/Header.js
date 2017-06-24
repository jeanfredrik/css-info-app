import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Header = ({
  onLogoClick,
  children,
}) => (
  <div className="flex-none border-bottom flex items-center p1">
    <h1 className="h3 regular my0 flex-none">
      <div
        onClick={onLogoClick}
        role="button"
        tabIndex={onLogoClick && 0}
        className={cx(
          'p1',
          onLogoClick && 'cursor-pointer',
        )}
      >
        <span style={{ paddingRight: '.125em' }}>css</span>
        <span style={{ paddingLeft: '.125em', borderLeft: '1px solid currentColor' }}>info</span>
      </div>
    </h1>
    {children}
  </div>
);

Header.defaultProps = {
  onLogoClick: null,
  children: null,
};

Header.propTypes = {
  onLogoClick: PropTypes.func,
  children: PropTypes.node,
};

export default Header;
