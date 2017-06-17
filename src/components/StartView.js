import React from 'react';
import PropTypes from 'prop-types';
import {
  kebabCase,
  uniqueId,
} from 'lodash/fp';
import {
  Form,
  Textarea,
} from 'react-form';
import styled from 'styled-components';

const ErrorBadge = styled.span.attrs({
  className: 'bg-red-15 red rounded h6',
})`
  padding: .0625rem .25rem;
`;

const fieldIdMaker = () => {
  const componentId = uniqueId();
  return id => `${kebabCase(id)}-${componentId}`;
};

const StartView = ({
  cssFiles,
  onCreateCSSFileFromTextFormSubmit,
  onCSSFileClick,
}) => (
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
                id,
                name,
                error,
                createdAt,
              }) => (
                <li key={id}>
                  <a
                    href=""
                    onClick={onCSSFileClick}
                    data-id={id}
                    className="items-baseline link-reset"
                  >
                    <span className="border-box underline blue">
                      {name}
                    </span>
                    {' '}
                    {
                      error
                      ? <ErrorBadge>
                        Parse error
                      </ErrorBadge>
                      : null
                    }
                    {' '}
                    <span className="border-box gray h6">
                      {new Date(createdAt).toLocaleString()}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
        : null
      }
      <h2>Parse new file</h2>
      <Form
        onSubmit={onCreateCSSFileFromTextFormSubmit}
        fieldId={fieldIdMaker()}
      >{({ submitForm, fieldId }) => (
        <form onSubmit={submitForm}>
          <label
            className="inline-block cursor-pointer mb1"
            htmlFor={fieldId('text')}
          >
            Paste CSS here:
          </label>
          <Textarea
            field="text"
            id={fieldId('text')}
            className="textarea col12 mb2"
            rows="10"
          />
          <button
            className="btn mb2 bg-green focus-outline-green white hover-border"
            type="submit"
          >
            Parse!
          </button>
        </form>
      )}</Form>
    </div>
  </div>
);

StartView.defaultProps = {
  parseError: null,
};

StartView.propTypes = {
  cssFiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCreateCSSFileFromTextFormSubmit: PropTypes.func.isRequired,
  onCSSFileClick: PropTypes.func.isRequired,
};

export default StartView;
