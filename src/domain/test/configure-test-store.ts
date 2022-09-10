import { configureStore } from '../../store/configure-store';
import { AppStore, Dependencies } from '../../store/store-types';

import { StubQuestionAdapter } from './stub-question-adapter';

export const configureTestStore = (deps: Partial<Dependencies> = {}): AppStore => {
  return configureStore({
    questionAdapter: new StubQuestionAdapter(),
    ...deps,
  });
};
