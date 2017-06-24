import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styled from 'styled-components';

import Icon from './Icon';

const TOCToggle = ({
  className,
  onClick,
  expanded,
}) => (
  <div
    className={cx(
      className,
      'flex',
      expanded ? 'justify-center' : 'justify-start',
    )}
  >
    <div
      className={cx(
        'bg-white h5 py1 z1 no-outline focus-outline-blue focus-border-blue cursor-pointer',
        (
          expanded
          ? 'border rounded'
          : 'border-top border-right border-bottom rounded-right'
        ),
      )}
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      <Icon
        className="block"
        name={
          expanded
          ? 'ion-android-arrow-dropleft'
          : 'ion-android-arrow-dropright'
        }
      />
    </div>
  </div>
);

TOCToggle.defaultProps = {
  className: '',
};

TOCToggle.propTypes = {
  className: PropTypes.string,
  expanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default styled(TOCToggle)`
  width: 0;
`;
