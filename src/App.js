/* globals
document
*/

import 'amino-css/dist/amino.css';

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import {
  generate as generateId,
} from 'shortid';

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
import parseCSS from './parseCSS';
import categories from './categories';

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
  }
  componentDidUpdate() {
    saveStateToSessionStorage(this.state);
  }
  async setSelectedCSSFile(key) {
    const cssFile = this.state.cssFiles.find(item => item.key === key);
    await updateState(this, {
      seletedCSSFile: { $set: key },
      items: { $set: transformItems(parseCSS(cssFile.content)) },
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
  async handleCreateCSSFileFromTextFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const content = formData.get('cssFileContent');
    const key = generateId();
    await updateState(this, {
      cssFiles: { $push: [{
        key,
        name: `Pasted file #${await this.getNextPastedFileNumber()}`,
        content,
        createdAt: new Date(),
      }] },
    });
    setStoredCSSFiles(this.state.cssFiles);
    await this.setSelectedCSSFile(key);
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
    } = this.state;
    return (
      <StartView
        cssFiles={cssFiles}
        onCreateCSSFileFromTextFormSubmit={
          this.handleCreateCSSFileFromTextFormSubmit
        }
        onCSSFileClick={this.handleCSSFileClick}
      />
    );
  }
}

export default App;
