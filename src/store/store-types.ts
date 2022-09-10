import { ThunkAction } from 'redux-thunk';

import { type AppAction } from '../domain/actions';
import { QuestionPort } from '../domain/ports/question-port';

import { type configureStore } from './configure-store';

export type Dependencies = {
  questionAdapter: QuestionPort;
};

export type AppStore = ReturnType<typeof configureStore>;

export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export interface AppSelector<ReturnType, Parameters extends unknown[]> {
  (state: AppState, ...params: Parameters): ReturnType;
}

export type Thunk<ReturnType = void> = ThunkAction<ReturnType, AppState, Dependencies, AppAction>;
