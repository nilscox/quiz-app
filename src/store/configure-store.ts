import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { AppAction } from '../domain/actions';
import { questionReducer } from '../domain/reducer';

const rootReducer = combineReducers({
  question: questionReducer,
});

export const configureStore = () => {
  let enhancer = applyMiddleware(thunk as ThunkMiddleware<ReturnType<typeof rootReducer>, AppAction>);

  if (process.env.NODE_ENV !== 'test') {
    enhancer = composeWithDevTools(enhancer);
  }

  return createStore(rootReducer, enhancer);
};
