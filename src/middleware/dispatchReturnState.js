import { applyMiddleware } from 'redux';

export default applyMiddleware(store => next => (action) => {
  next(action);
  return store.getState();
});
