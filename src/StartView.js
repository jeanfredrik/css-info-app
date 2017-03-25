import React, { PropTypes } from 'react';
import {
  uniqueId,
} from 'lodash/fp';

const StartView = ({
  cssFiles,
  onCreateCSSFileFromTextFormSubmit,
  onCSSFileClick,
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
        <form className="" onSubmit={onCreateCSSFileFromTextFormSubmit}>
          <label htmlFor={`css-file-content-${componentId}`}>Paste CSS here:</label>
          <textarea id={`css-file-content-${componentId}`} className="textarea col12" rows="10" name="cssFileContent" />
          <button className="btn" type="submit">Parse!</button>
        </form>
      </div>
    </div>
  );
};

StartView.defaultProps = {
};

StartView.propTypes = {
  cssFiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCreateCSSFileFromTextFormSubmit: PropTypes.func.isRequired,
  onCSSFileClick: PropTypes.func.isRequired,
};

export default StartView;
