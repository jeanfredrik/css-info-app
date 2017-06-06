import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  repeat,
  entries,
  flow,
  // flatMap,
  map,
  isObject,
  placeholder as $,
} from 'lodash/fp';

const indentation = repeat($, '  ');

const renderCSSDeclarations = (indent = 0) => flow([
  entries,
  map(
    ([key, value]) => (
      isObject(value)
      ? <CSSNestedRule
        key={key}
        indent={indent}
        selector={key}
        declarations={value}
      />
      : <CSSDeclaration
        key={key}
        indent={indent}
        property={key}
        value={value}
      />
    ),
  ),
]);

const CSSDeclaration = ({
  indent,
  property,
  value,
}) => (
  <div>
    <span>{indentation(indent)}</span>
    <span className="red">
      {property}
    </span>
    {': '}
    <span>
      {value}
    </span>
    {';'}
  </div>
);

CSSDeclaration.propTypes = {
  indent: PropTypes.number.isRequired,
  property: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
};

const CSSNestedRule = ({
  indent,
  selector,
  declarations,
}) => (
  <div>
    <div>{`${indentation(indent)}${selector} {`}</div>
    {renderCSSDeclarations(indent + 1)(declarations)}
    <div>{`${indentation(indent)}}`}</div>
  </div>
);

CSSNestedRule.propTypes = {
  indent: PropTypes.number.isRequired,
  selector: PropTypes.string.isRequired,
  declarations: PropTypes.object.isRequired,
};

const DefaultItem = ({
  css,
}) => (
  <pre
    className={cx(
      'block p2 rounded border bg-silver-50 my0',
    )}
  >
    {renderCSSDeclarations(0)(css)}
  </pre>
);

DefaultItem.propTypes = {
  css: PropTypes.object.isRequired,
};

export default DefaultItem;
