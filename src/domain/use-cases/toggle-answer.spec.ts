import { AppStore } from '../../store/store-types';
import { setQuestion } from '../actions';
import { selectAnswers } from '../selectors';
import { configureTestStore } from '../test/configure-test-store';
import { createAnswer, createQuestion } from '../test/entity-creators';

import { toggleAnswer } from './toggle-answer';

describe('toggleAnswer', () => {
  let store: AppStore;

  beforeEach(() => {
    store = configureTestStore();
  });

  it("marks a question's answer as selected", () => {
    // ARRANGE
    const answer = createAnswer({ selected: false });
    const question = createQuestion({ answers: [answer] });

    store.dispatch(setQuestion(question));

    // ACT
    store.dispatch(toggleAnswer(answer));

    // ASSERT
    expect(selectAnswers(store.getState())).toHaveProperty('0.selected', true);
  });

  it('marks the answer as not selected when it is already selected', () => {
    // ARRANGE
    const answer = createAnswer({ selected: true });
    const question = createQuestion({ answers: [answer] });

    store.dispatch(setQuestion(question));

    // ACT
    store.dispatch(toggleAnswer(answer));

    // ASSERT
    expect(selectAnswers(store.getState())).toHaveProperty('0.selected', false);
  });

  it('marks another previously selected answer as unselected', () => {
    // ARRANGE
    const selectedAnswer = createAnswer({ selected: true });
    const otherAnswer = createAnswer({ selected: false });
    const question = createQuestion({ answers: [selectedAnswer, otherAnswer] });

    store.dispatch(setQuestion(question));

    // ACT
    store.dispatch(toggleAnswer(otherAnswer));

    // ASSERT
    expect(selectAnswers(store.getState())).toHaveProperty('0.selected', false);
    expect(selectAnswers(store.getState())).toHaveProperty('1.selected', true);
  });
});
