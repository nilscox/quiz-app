import { configureStore } from '../../store/configure-store';
import { AppStore } from '../../store/store-types';
import { setQuestion } from '../actions';
import { selectQuestion } from '../selectors';
import { createAnswer, createQuestion } from '../test/entity-creators';

import { validateAnswer } from './validate-answer';

describe('validateAnswer', () => {
  let store: AppStore;

  beforeEach(() => {
    store = configureStore();
    window.fetch = vi.fn();
  });

  it('calls an API endpoint to validate the selected answer', async () => {
    const answer = createAnswer({ text: 'answer text', selected: true });
    const question = createQuestion({ id: 'questionId', answers: [answer] });

    // ARRANGE
    store.dispatch(setQuestion(question));

    // ACT
    await store.dispatch(validateAnswer());

    // ASSERT
    expect(window.fetch).toHaveBeenCalledWith('/question/questionId/answer', {
      method: 'POST',
      body: 'answer text',
    });
  });

  it('marks the question as validated', async () => {
    const answer = createAnswer({ selected: true });
    const question = createQuestion({ id: 'questionId', answers: [answer] });

    // ARRANGE
    store.dispatch(setQuestion(question));

    // ACT
    await store.dispatch(validateAnswer());

    // ASSERT
    expect(selectQuestion(store.getState())).toHaveProperty('validated', true);
  });

  it('throws an error when the question is not set', async () => {
    // ACT / ASSERT
    await expect(store.dispatch(validateAnswer())).rejects.toThrow('The question is not set');
  });

  it('throws an error when no answer is selected', async () => {
    const question = createQuestion({ answers: [] });

    // ARRANGE
    store.dispatch(setQuestion(question));

    // ACT / ASSERT
    await expect(store.dispatch(validateAnswer())).rejects.toThrow('There is no selected answer');
  });
});
