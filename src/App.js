/* globals
document
*/

import 'amino-css/dist/amino.css';

import {
  generate as generateId,
} from 'shortid';
import React, { Component } from 'react';
import autoBind from 'react-autobind';

import {
  filter,
} from 'lodash/fp';

import {
  transformItems,
  updateState,
  updateStateWith,
  prepareItems,
  jsonReplacer,
  jsonReviver,
} from './utils';
import MainView from './MainView';
import StartView from './StartView';
import categories from './categories';
import parseCSS from './parseCSS';

function setStoredCSSFiles(cssFiles) {
  window.sessionStorage.setItem('cssFiles', JSON.stringify(cssFiles, jsonReplacer));
}

function loadStateFromSessionStorage() {
  const state = window.sessionStorage.getItem('appState');
  if (state) {
    return JSON.parse(state, jsonReviver);
  }
  return null;
}

function saveStateToSessionStorage(state) {
  window.sessionStorage.setItem('appState', JSON.stringify(state, jsonReplacer));
}

window.toJSON = value => JSON.stringify(value, jsonReplacer);
window.fromJSON = value => JSON.parse(value, jsonReviver);

class App extends Component {
  constructor(props) {
    super(props);
    // const cssNode = document.querySelector('.js-css');
    // if (cssNode) {
    //   const css = cssNode.childNodes[0].nodeValue;
    //   const items = parseCSS(css);
    //   this.state = update(this.state, {
    //     items: { $set: transformItems(items) },
    //   });
    // }
    const storedState = loadStateFromSessionStorage();
    if (storedState) {
      this.state = storedState;
    }
    this.state = {
      ...this.state,
      createCSSFileFromTextFormError: null,
    };
    autoBind(this);
    this.prepareItems = prepareItems(categories);
  }
  state = {
    items: [],
    search: '',
    showAllStateClassNames: false,
    showAllMediaClassNames: false,
    cssFiles: [],
    seletedCSSFile: null,
    nextPastedFileNumber: 1,
    createCSSFileFromTextFormError: null,
  }
  componentDidUpdate() {
    saveStateToSessionStorage(this.state);
  }
  async setSelectedCSSFile(key) {
    const cssFile = this.state.cssFiles.find(item => item.key === key);
    await updateState(this, {
      seletedCSSFile: { $set: key },
      items: { $set: transformItems(parseCSS(cssFile.name, cssFile.content)) },
    });
  }
  async getNextPastedFileNumber() {
    await updateState(this, {
      nextPastedFileNumber: { $apply: value => value + 1 },
    });
    return this.state.nextPastedFileNumber;
  }
  async unsetSelectedCSSFile() {
    await updateState(this, {
      seletedCSSFile: { $set: null },
      items: { $set: [] },
    });
  }
  async handleSearchChange(event) {
    const value = event.target.value;
    await updateState(this, {
      search: { $set: value },
    });
  }
  async handleToggleShowAllStateClassNamesButtonClick(event) {
    event.preventDefault();
    await updateStateWith(this, (state => ({
      showAllStateClassNames: { $set: !state.showAllStateClassNames },
    })));
  }
  async handleToggleShowAllMediaClassNamesButtonClick(event) {
    event.preventDefault();
    await updateStateWith(this, (state => ({
      showAllMediaClassNames: { $set: !state.showAllMediaClassNames },
    })));
  }
  handleCreateCSSFileFromTextInputRef(element) {
    this.createCSSFileFromTextInputElement = element;
  }
  async handleCreateCSSFileFromTextFormSubmit(event) {
    event.preventDefault();
    let key;
    let name;
    try {
      const content = this.createCSSFileFromTextInputElement.value;
      key = generateId();
      name = `Pasted file #${await this.getNextPastedFileNumber()}`;
      await updateState(this, {
        createCSSFileFromTextFormError: { $set: null },
        cssFiles: { $push: [{
          key,
          name,
          content,
          createdAt: new Date(),
        }] },
      });
      setStoredCSSFiles(this.state.cssFiles);
      await this.setSelectedCSSFile(key);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      await this.unsetSelectedCSSFile();
      await updateState(this, {
        createCSSFileFromTextFormError: { $set: error },
        cssFiles: { $apply: filter(cssFile => cssFile.key !== key) },
      });
    }
  }
  async handleLogoClick(event) {
    event.preventDefault();
    await this.unsetSelectedCSSFile();
  }
  async handleCSSFileClick(event) {
    event.preventDefault();
    await this.setSelectedCSSFile(event.currentTarget.dataset.key);
  }
  render() {
    const {
      seletedCSSFile,
    } = this.state;
    if (seletedCSSFile) {
      const {
        items,
        search,
        showAllStateClassNames,
        showAllMediaClassNames,
      } = this.state;
      return (
        <MainView
          categories={this.prepareItems(search, items)}
          search={search}
          showAllStateClassNames={showAllStateClassNames}
          showAllMediaClassNames={showAllMediaClassNames}
          onSearchChange={this.handleSearchChange}
          onToggleShowAllStateClassNamesButtonClick={
            this.handleToggleShowAllStateClassNamesButtonClick
          }
          onToggleShowAllMediaClassNamesButtonClick={
            this.handleToggleShowAllMediaClassNamesButtonClick
          }
          onLogoClick={this.handleLogoClick}
        />
      );
    }
    const {
      cssFiles,
      createCSSFileFromTextFormError,
    } = this.state;
    return (
      <StartView
        cssFiles={cssFiles}
        onCreateCSSFileFromTextFormSubmit={
          this.handleCreateCSSFileFromTextFormSubmit
        }
        onCSSFileClick={this.handleCSSFileClick}
        createCSSFileFromTextInputRef={this.handleCreateCSSFileFromTextInputRef}
        createCSSFileFromTextFormError={createCSSFileFromTextFormError}
      />
    );
  }
}

export default App;
