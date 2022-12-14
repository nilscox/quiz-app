import { Provider as ReduxProvider } from 'react-redux';

import { setQuestion } from '../domain/actions';
import { createAnswer, createQuestion } from '../domain/test/entity-creators';
import { configureStore } from '../store/configure-store';

import { Question } from './Question';
import { HttpQuestionAdapter } from './adapters/http-question-adapter';
import { LocalStorageQuestionAdapter } from './adapters/local-storage-question-adapter';

HttpQuestionAdapter;
LocalStorageQuestionAdapter;

const store = configureStore({
  // questionAdapter: new HttpQuestionAdapter(),
  questionAdapter: new LocalStorageQuestionAdapter(),
});

const question = createQuestion({
  text: "Quelle est la couleur du cheval blanc d'Henri XLII ?",
  answers: [
    createAnswer({ text: 'Oui' }),
    createAnswer({ text: 'Faux' }),
    createAnswer({ text: 'Quarante-deux' }),
    createAnswer({ text: 'La réponse D', correct: true }),
  ],
});

store.dispatch(setQuestion(question));

export const App: React.FC = () => (
  <ReduxProvider store={store}>
    <div className="h-100 bg-light d-flex justify-content-center align-items-center">
      <Question />
    </div>
  </ReduxProvider>
);
