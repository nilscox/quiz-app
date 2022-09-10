import { ThunkAction } from 'redux-thunk';

import { type AppAction } from '../domain/actions';

import { type configureStore } from './configure-store';

export type AppStore = ReturnType<typeof configureStore>;

export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export type Thunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AppAction>;
