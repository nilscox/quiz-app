import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { AppAction } from '../domain/actions';
import { questionReducer } from '../domain/reducer';

import { Dependencies } from './store-types';

const rootReducer = combineReducers({
  question: questionReducer,
});

// using the AppState defined in store-types.ts would create a circular type dependency
type AppState = ReturnType<typeof rootReducer>;
type AppThunkMiddleware = ThunkMiddleware<AppState, AppAction, Dependencies>;

export const configureStore = (deps: Dependencies) => {
  let enhancer = applyMiddleware(thunk.withExtraArgument(deps) as AppThunkMiddleware);

  if (process.env.NODE_ENV !== 'test') {
    enhancer = composeWithDevTools(enhancer);
  }

  return createStore(rootReducer, enhancer);
};
