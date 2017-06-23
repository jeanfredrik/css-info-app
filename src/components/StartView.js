import React from 'react';
import PropTypes from 'prop-types';
import {
  kebabCase,
  uniqueId,
} from 'lodash/fp';
import {
  Form,
  Textarea,
  Text,
} from 'react-form';
import styled from 'styled-components';

import Header from './Header';

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
  onCreateCSSFileFromURLFormSubmit,
  onCSSFileClick,
}) => (
  <div className="flex flex-column height-100">
    <Header>
      {
        process.env.REACT_APP_VERSION && process.env.REACT_APP_RELEASE_LIST
        ? (
          <span className="flex-none ml-auto p1">
            <a
              href={process.env.REACT_APP_RELEASE_LIST}
              target="_blank"
              className="color-inherit opacity-50 no-underline hover-underline"
              rel="noopener noreferrer"
            >
              {process.env.REACT_APP_VERSION}
            </a>
          </span>
        )
        : null
      }
    </Header>
    <div className="p2 overflow-auto flex-auto">
      <div className="mb4 mtn4" />
      <h2 className="mt3">Parse from URL</h2>
      <Form
        onSubmit={onCreateCSSFileFromURLFormSubmit}
        fieldId={fieldIdMaker()}
      >{({ submitForm, fieldId }) => (
        <form onSubmit={submitForm} className="">
          <div className="flex items-baseline mrn1 mb1">
            <label
              className="inline-block cursor-pointer mr1"
              htmlFor={fieldId('url')}
            >
              URL:
            </label>
            <div
              className="flex-auto mr1"
            >
              <Text
                field="url"
                type="text"
                id={fieldId('url')}
                className="input col12"
              />
            </div>
            <button
              className="btn bg-green focus-outline-green white hover-border mr1"
              type="submit"
            >
              Parse!
            </button>
          </div>
          <p className="h5 opacity-50">
            Note: The URL must point to a valid CSS file.
          </p>
        </form>
      )}</Form>
      <h2 className="mt3">Parse from pasted CSS</h2>
      <Form
        onSubmit={onCreateCSSFileFromTextFormSubmit}
        fieldId={fieldIdMaker()}
      >{({ submitForm, fieldId }) => (
        <form onSubmit={submitForm} className="mbn2">
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
      {
        cssFiles.length > 0
        ? (
          <div>
            <h2 className="mt3">Previous files</h2>
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
                        {{
                          fetch: 'Fetch error',
                          parse: 'Parse error',
                        }[error.type]}
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
    </div>
  </div>
);

StartView.defaultProps = {
  parseError: null,
};

StartView.propTypes = {
  cssFiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCreateCSSFileFromTextFormSubmit: PropTypes.func.isRequired,
  onCreateCSSFileFromURLFormSubmit: PropTypes.func.isRequired,
  onCSSFileClick: PropTypes.func.isRequired,
};

export default StartView;
