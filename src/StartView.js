import React from 'react';
import PropTypes from 'prop-types';
import {
  uniqueId,
} from 'lodash/fp';

const StartView = ({
  cssFiles,
  onCreateCSSFileFromTextFormSubmit,
  onCSSFileClick,
  createCSSFileFromTextInputRef,
  createCSSFileFromTextFormError,
}) => {
  const componentId = uniqueId();
  return (
    <div className="flex flex-column height-100">
      <div className="flex-none border-bottom flex items-center p1">
        <h1 className="p1 h3 regular my0">
          <span style={{ paddingRight: '.125em' }}>css</span>
          <span style={{ paddingLeft: '.125em', borderLeft: '1px solid currentColor' }}>info</span>
        </h1>
      </div>
      <div className="p2 overflow-auto flex-auto">
        {
          cssFiles.length > 0
          ? (
            <div>
              <h2>Previous files</h2>
              <ul>
                {cssFiles.map(({
                  key,
                  name,
                  createdAt,
                }) => (
                  <li key={key}>
                    <a
                      href=""
                      onClick={onCSSFileClick}
                      data-key={key}
                      className="items-baseline link-reset"
                    >
                      <span className="border-box underline blue">{name}</span>
                      {' '}
                      <span className="border-box gray h6">{createdAt.toLocaleString()}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )
          : null
        }
        <h2>Parse new file</h2>
        {
          createCSSFileFromTextFormError
          ? <div className="bg-red-15 red p2 rounded mb2">
            {'Could not parse CSS: '}
            {createCSSFileFromTextFormError && createCSSFileFromTextFormError.message}
          </div>
          : null
        }
        <form className="" onSubmit={onCreateCSSFileFromTextFormSubmit}>
          <label
            className="inline-block cursor-pointer mb1"
            htmlFor={`css-file-content-${componentId}`}
          >
            Paste CSS here:
          </label>
          <textarea
            id={`css-file-content-${componentId}`}
            className="textarea col12 mb2"
            rows="10"
            ref={createCSSFileFromTextInputRef}
          />
          <button className="btn mb2 bg-green focus-outline-green white hover-border" type="submit">Parse!</button>
        </form>
      </div>
    </div>
  );
};

StartView.defaultProps = {
  createCSSFileFromTextFormError: null,
};

StartView.propTypes = {
  cssFiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCreateCSSFileFromTextFormSubmit: PropTypes.func.isRequired,
  onCSSFileClick: PropTypes.func.isRequired,
  createCSSFileFromTextInputRef: PropTypes.func.isRequired,
  createCSSFileFromTextFormError: PropTypes.any,
};

export default StartView;
