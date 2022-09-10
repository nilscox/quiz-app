import { configureStore } from '../store/configure-store';
import { AppStore } from '../store/store-types';

import { setQuestion } from './actions';
import {
  selectAnswers,
  selectAnswersMatching,
  selectCorrectAnswer,
  selectQuestion,
  selectSelectedAnswer,
} from './selectors';
import { createAnswer, createQuestion } from './test/entity-creators';

describe('selectors', () => {
  let store: AppStore;

  beforeEach(() => {
    store = configureStore();
  });

  describe('selectQuestion', () => {
    const question = createQuestion();

    it('returns the app question', () => {
      store.dispatch(setQuestion(question));

      expect(selectQuestion(store.getState())).toBe(question);
    });

    it('returns null when no question is set', () => {
      expect(selectQuestion(store.getState())).toBeNull();
    });
  });

  describe('selectAnswers', () => {
    const answer = createAnswer();
    const question = createQuestion({ answers: [answer] });

    it("returns the question's answers", () => {
      store.dispatch(setQuestion(question));

      expect(selectAnswers(store.getState())).toEqual([answer]);
    });

    it('returns undefined when no question is set', () => {
      expect(selectAnswers(store.getState())).toBeUndefined();
    });
  });

  describe('selectAnswerMatching', () => {
    const matchingAnswer1 = createAnswer({ text: 'I like science' });
    const matchingAnswer2 = createAnswer({ text: 'You like pie' });
    const notMatchingAnswer = createAnswer({ text: 'Nope' });
    const question = createQuestion({ answers: [matchingAnswer1, matchingAnswer2, notMatchingAnswer] });

    it("returns the question's answers matching a regexp", () => {
      store.dispatch(setQuestion(question));

      expect(selectAnswersMatching(store.getState(), /like/)).toEqual([matchingAnswer1, matchingAnswer2]);
      expect(selectAnswersMatching(store.getState(), /science/)).toEqual([matchingAnswer1]);
    });

    it('returns undefined when no question is set', () => {
      expect(selectAnswersMatching(store.getState(), /like/)).toBeUndefined();
    });
  });

  describe('selectCorrectAnswer', () => {
    const correctAnswer = createAnswer({ correct: true });
    const incorrectAnswer = createAnswer({ correct: false });
    const question = createQuestion({ answers: [correctAnswer, incorrectAnswer] });

    it("returns the question's answers", () => {
      store.dispatch(setQuestion(question));

      expect(selectCorrectAnswer(store.getState())).toEqual(correctAnswer);
    });

    it('returns undefined when no question is set', () => {
      expect(selectCorrectAnswer(store.getState())).toBeUndefined();
    });
  });

  describe('selectCorrectAnswer', () => {
    const selectedAnswer = createAnswer({ selected: true });
    const notSelectedAnswer = createAnswer({ selected: false });
    const question = createQuestion({ answers: [selectedAnswer, notSelectedAnswer] });

    it("returns the question's answers", () => {
      store.dispatch(setQuestion(question));

      expect(selectSelectedAnswer(store.getState())).toEqual(selectedAnswer);
    });

    it('returns undefined when no question is set', () => {
      expect(selectSelectedAnswer(store.getState())).toBeUndefined();
    });
  });
});