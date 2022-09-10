import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = (state = {}) => state;

export const configureStore = () => {
  let enhancer = applyMiddleware(thunk);

  if (process.env.NODE_ENV !== 'test') {
    enhancer = composeWithDevTools(enhancer);
  }

  return createStore(rootReducer, enhancer);
};
