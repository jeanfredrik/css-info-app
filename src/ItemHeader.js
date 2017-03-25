import React, { PropTypes } from 'react';
import ItemHeaderClassName from './ItemHeaderClassName';

const ItemHeader = ({
  classNames,
  showMediaClassNames,
  showStateClassNames,
  displayedValue,
  onToggleStateClassNamesButtonClick,
  onToggleMediaClassNamesButtonClick,
}) => {
  const plainClassNames = classNames.filter(
    ({ state, media }) => !state && !media,
  );
  const otherClassNames = classNames.filter(
    ({ state, media }) => (showStateClassNames && state) || (showMediaClassNames && media),
  );
  const stateCount = classNames.filter(
    ({ state }) => state,
  ).length;
  const mediaCount = classNames.filter(
    ({ media }) => media,
  ).length;
  return (
    <div className="monospace lh-solid flex-none">
      <div className="flex items-end mrn1 pb1 mbn1">
        <div className="flex-auto flex flex-wrap mrn1 mbn1 pb1 pr1 items-baseline">
          {
            plainClassNames.length > 0
            ? plainClassNames.map(className => (
              <ItemHeaderClassName key={className.name} {...className} />
            ))
            : (
              <span className="mb1 mr1 flex-none py-half italic gray">
                No plain classes
              </span>
            )
          }
          {
            displayedValue != null
            ? <span className="flex-none mr1 mb1 maxw-100"> = {displayedValue}</span>
            : null
          }
        </div>
        {
          stateCount
          ? (
            <button className="cursor-pointer mb1 mr1 rounded flex-none bg-blue white p-half focus-outline-blue" onClick={onToggleStateClassNamesButtonClick}>
              {`:${stateCount}`}
            </button>
          )
          : null
        }
        {
          mediaCount
          ? (
            <button className="cursor-pointer mb1 mr1 rounded flex-none bg-red white p-half focus-outline-red" onClick={onToggleMediaClassNamesButtonClick}>
              {`@${mediaCount}`}
            </button>
          )
          : null
        }
      </div>
      {
        otherClassNames.length > 0
        ? (
          <div className="flex items-end mrn1 pb1">
            <div className="flex-auto flex flex-wrap mrn1 mbn1 items-baseline">
              {otherClassNames.map(className => (
                <ItemHeaderClassName key={className.name} {...className} />
              ))}
            </div>
          </div>
        )
        : null
      }
    </div>
  );
};

ItemHeader.defaultProps = {
  displayedValue: null,
  showStateClassNames: false,
  showMediaClassNames: false,
};

ItemHeader.propTypes = {
  classNames: PropTypes.arrayOf(PropTypes.object).isRequired,
  displayedValue: PropTypes.string,
  showStateClassNames: PropTypes.bool,
  showMediaClassNames: PropTypes.bool,
  onToggleStateClassNamesButtonClick: PropTypes.func.isRequired,
  onToggleMediaClassNamesButtonClick: PropTypes.func.isRequired,
};

export default ItemHeader;
