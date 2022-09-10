import { Provider as ReduxProvider } from 'react-redux';

import { QuestionPort } from '../domain/ports/question-port';
import { configureStore } from '../store/configure-store';

const store = configureStore({
  questionAdapter: {} as QuestionPort,
});

export const App: React.FC = () => {
  return <ReduxProvider store={store}>app</ReduxProvider>;
};
