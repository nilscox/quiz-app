import { configureStore } from '../../store/configure-store';
import { AppStore } from '../../store/store-types';
import { setQuestion } from '../actions';
import { selectQuestion } from '../selectors';
import { configureTestStore } from '../test/configure-test-store';
import { createAnswer, createQuestion } from '../test/entity-creators';
import { MockQuestionAdapter } from '../test/mock-question-adapter';
import { StubQuestionAdapter } from '../test/stub-question-adapter';

import { validateAnswer } from './validate-answer';

describe('validateAnswer', () => {
  let questionAdapter: StubQuestionAdapter;
  let store: AppStore;

  beforeEach(() => {
    questionAdapter = new StubQuestionAdapter();
    store = configureTestStore({ questionAdapter });
  });

  it('calls an API endpoint to validate the selected answer', async () => {
    // ARRANGE
    const answer = createAnswer({ text: 'answer text', selected: true });
    const question = createQuestion({ id: 'questionId', answers: [answer] });

    store.dispatch(setQuestion(question));

    // ACT
    await store.dispatch(validateAnswer());

    // ASSERT
    expect(questionAdapter.answeredQuestion).toBe(question);
    expect(questionAdapter.selectedAnswer).toBe(answer);
  });

  it('also calls an API endpoint (mock adapter version)', async () => {
    // ARRANGE
    const answer = createAnswer({ text: 'answer text', selected: true });
    const question = createQuestion({ id: 'questionId', answers: [answer] });

    const questionAdapter = new MockQuestionAdapter();
    const store = configureStore({ questionAdapter });

    store.dispatch(setQuestion(question));

    // ACT
    await store.dispatch(validateAnswer());

    // ASSERT
    expect(questionAdapter.saveAnswer).toHaveBeenCalledWith(question, answer);
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
