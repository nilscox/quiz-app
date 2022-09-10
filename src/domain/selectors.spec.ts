import { AppStore } from '../store/store-types';

import { setQuestion } from './actions';
import { AnswerCorrection } from './entities';
import {
  selectAnswerCorrection,
  selectAnswers,
  selectAnswersMatching,
  selectCanSelectAnswer,
  selectCanValidateAnswer,
  selectCorrectAnswer,
  selectQuestion,
  selectSelectedAnswer,
} from './selectors';
import { configureTestStore } from './test/configure-test-store';
import { createAnswer, createQuestion } from './test/entity-creators';

describe('selectors', () => {
  let store: AppStore;

  beforeEach(() => {
    store = configureTestStore();
  });

  describe('selectQuestion', () => {
    const question = createQuestion();

    it('returns the app question', () => {
      // ARRANGE
      store.dispatch(setQuestion(question));

      // ACT / ASSERT
      expect(selectQuestion(store.getState())).toBe(question);
    });

    it('returns null when no question is set', () => {
      // ACT / ASSERT
      expect(selectQuestion(store.getState())).toBeNull();
    });
  });

  describe('selectAnswers', () => {
    const answer = createAnswer();
    const question = createQuestion({ answers: [answer] });

    it("returns the question's answers", () => {
      // ARRANGE
      store.dispatch(setQuestion(question));

      // ACT / ASSERT
      expect(selectAnswers(store.getState())).toEqual([answer]);
    });

    it('returns undefined when no question is set', () => {
      // ACT / ASSERT
      expect(selectAnswers(store.getState())).toBeUndefined();
    });
  });

  describe('selectAnswerMatching', () => {
    const matchingAnswer1 = createAnswer({ text: 'I like science' });
    const matchingAnswer2 = createAnswer({ text: 'You like pie' });
    const notMatchingAnswer = createAnswer({ text: 'Nope' });
    const question = createQuestion({ answers: [matchingAnswer1, matchingAnswer2, notMatchingAnswer] });

    it("returns the question's answers matching a regexp", () => {
      // ARRANGE
      store.dispatch(setQuestion(question));

      // ACT / ASSERT
      expect(selectAnswersMatching(store.getState(), /like/)).toEqual([matchingAnswer1, matchingAnswer2]);
      expect(selectAnswersMatching(store.getState(), /science/)).toEqual([matchingAnswer1]);
    });

    it('returns undefined when no question is set', () => {
      // ACT / ASSERT
      expect(selectAnswersMatching(store.getState(), /like/)).toBeUndefined();
    });
  });

  describe('selectCorrectAnswer', () => {
    const correctAnswer = createAnswer({ correct: true });
    const incorrectAnswer = createAnswer({ correct: false });
    const question = createQuestion({ answers: [correctAnswer, incorrectAnswer] });

    it("returns the question's answers", () => {
      // ARRANGE
      store.dispatch(setQuestion(question));

      // ACT / ASSERT
      expect(selectCorrectAnswer(store.getState())).toEqual(correctAnswer);
    });

    it('returns undefined when no question is set', () => {
      // ACT / ASSERT
      expect(selectCorrectAnswer(store.getState())).toBeUndefined();
    });
  });

  describe('selectCanSelectAnswer', () => {
    it('returns true when the question is not validated', () => {
      // ARRANGE
      store.dispatch(setQuestion(createQuestion({ validated: false })));

      // ACT / ASSERT
      expect(selectCanSelectAnswer(store.getState())).toBe(true);
    });

    it('returns false when the question is validated', () => {
      // ARRANGE
      store.dispatch(setQuestion(createQuestion({ validated: true })));

      // ACT / ASSERT
      expect(selectCanSelectAnswer(store.getState())).toBe(false);
    });

    it('returns false when no question is set', () => {
      // ACT / ASSERT
      expect(selectCanSelectAnswer(store.getState())).toBe(false);
    });
  });

  describe('selectSelectedAnswer', () => {
    const selectedAnswer = createAnswer({ selected: true });
    const notSelectedAnswer = createAnswer({ selected: false });
    const question = createQuestion({ answers: [selectedAnswer, notSelectedAnswer] });

    it("returns the question's answers", () => {
      // ARRANGE
      store.dispatch(setQuestion(question));

      // ACT / ASSERT
      expect(selectSelectedAnswer(store.getState())).toEqual(selectedAnswer);
    });

    it('returns undefined when no question is set', () => {
      // ACT / ASSERT
      expect(selectSelectedAnswer(store.getState())).toBeUndefined();
    });
  });

  describe('selectCanValidateAnswer', () => {
    it('returns true when an answer is selected and the question is not already validated', () => {
      // ARRANGE
      const question = createQuestion({ answers: [createAnswer({ selected: true })], validated: false });

      store.dispatch(setQuestion(question));

      // ACT / ASSERT
      expect(selectCanValidateAnswer(store.getState())).toBe(true);
    });

    it('returns false when no answer is selected', () => {
      // ARRANGE
      const question = createQuestion({ answers: [createAnswer({ selected: false })], validated: false });

      store.dispatch(setQuestion(question));

      // ACT / ASSERT
      expect(selectCanValidateAnswer(store.getState())).toBe(false);
    });

    it('returns false when the question is already validated', () => {
      // ARRANGE
      const question = createQuestion({ answers: [createAnswer({ selected: true })], validated: true });

      store.dispatch(setQuestion(question));

      // ACT / ASSERT
      expect(selectCanValidateAnswer(store.getState())).toBe(false);
    });

    it('returns false when no question is set', () => {
      // ACT / ASSERT
      expect(selectCanValidateAnswer(store.getState())).toBe(false);
    });
  });

  describe('selectAnswerCorrection', () => {
    it('returns "correct", when the answer is correct', () => {
      // ARRANGE
      const answer = createAnswer({ correct: true });
      const question = createQuestion({ answers: [answer], validated: true });

      store.dispatch(setQuestion(question));

      // ACT / ASSERT
      expect(selectAnswerCorrection(store.getState(), answer.id)).toBe(AnswerCorrection.correct);
    });

    it('returns "incorrect", when the answer is not correct and was selected', () => {
      // ARRANGE
      const answer = createAnswer({ correct: false, selected: true });
      const question = createQuestion({ answers: [answer], validated: true });

      store.dispatch(setQuestion(question));

      // ACT / ASSERT
      expect(selectAnswerCorrection(store.getState(), answer.id)).toBe(AnswerCorrection.incorrect);
    });

    it('returns "none", when the question is not validated', () => {
      // ARRANGE
      const answer = createAnswer();
      const question = createQuestion({ answers: [answer], validated: false });

      store.dispatch(setQuestion(question));

      // ACT / ASSERT
      expect(selectAnswerCorrection(store.getState(), answer.id)).toBe(AnswerCorrection.none);
    });

    it('returns "none", when the answer is not correct but was not selected', () => {
      // ARRANGE
      const answer = createAnswer({ correct: false, selected: false });
      const question = createQuestion({ answers: [answer], validated: false });

      store.dispatch(setQuestion(question));

      // ACT / ASSERT
      expect(selectAnswerCorrection(store.getState(), answer.id)).toBe(AnswerCorrection.none);
    });
  });
});
