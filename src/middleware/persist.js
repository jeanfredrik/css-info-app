import { applyMiddleware } from 'redux';
import {
  isEqual,
} from 'lodash/fp';

// This is a wrapper around `window.localStorage` that handles serialization
// and `storage` event listeners
const localStorage = {
  get(key) {
    const value = window.localStorage.getItem(key);
    if (value == null) {
      return null;
    }
    return this.parseValue(value);
  },
  set(key, value) {
    return window.localStorage.setItem(key, this.stringifyValue(value));
  },
  parseValue(value) {
    try {
      return JSON.parse(atob(value));
    } catch (error) {
      return null;
    }
  },
  stringifyValue(value) {
    return btoa(JSON.stringify(value));
  },
  onUpdate(key, callback) {
    const listener = (event) => {
      if (
        event.storageArea === window.localStorage
        && event.key === key
        && event.oldValue !== event.newValue
      ) {
        callback(this.parseValue(event.newValue));
      }
    };
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  },
};

export default (
  select,
  {
    actionType = 'PATCH_FROM_LOCAL_STORAGE',
    key = process.env.REACT_APP_LOCAL_STORAGE_KEY || 'store',
  } = {},
) => applyMiddleware((store) => {
  const storage = localStorage;
  const patchFromLocalStorage = values => ({
    type: actionType,
    values: select(values),
  });
  // Subscribe to `storage` events (i.e. changes in other browser windows)
  storage.onUpdate(key, (values) => {
    store.dispatch(patchFromLocalStorage(values));
  });
  // Begin by patching
  const values = storage.get(key);
  if (values != null) {
    store.dispatch(patchFromLocalStorage(values));
  }
  // Return the actual middleware where we react to changes in the store and update the storage
  return next => (action) => {
    // We should not react to the patch action
    if (action.type === actionType) {
      return next(action);
    }
    // Only update storage if there’s actually been a change
    // to the part of the state that we care about (via `select`)
    const oldState = store.getState();
    const result = next(action);
    const newState = store.getState();
    const oldValue = select(oldState);
    const newValue = select(newState);
    if (!isEqual(oldValue, newValue)) {
      storage.set(key, newValue);
    }
    return result;
  };
});
