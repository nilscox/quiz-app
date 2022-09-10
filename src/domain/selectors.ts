import { AppState } from '../store/store-types';

import { AnswerCorrection } from './entities';

export const selectQuestion = (state: AppState) => {
  return state.question;
};

export const selectAnswers = (state: AppState) => {
  return selectQuestion(state)?.answers;
};

export const selectAnswer = (state: AppState, answerId: string) => {
  return selectAnswers(state)?.find(({ id }) => id === answerId);
};

export const selectAnswersMatching = (state: AppState, re: RegExp) => {
  return selectAnswers(state)?.filter((answer) => answer.text.match(re));
};

export const selectCorrectAnswer = (state: AppState) => {
  return selectAnswers(state)?.find((answer) => answer.correct);
};

export const selectCanSelectAnswer = (state: AppState) => {
  return selectIsQuestionValidated(state) === false;
};

export const selectSelectedAnswer = (state: AppState) => {
  return selectAnswers(state)?.find((answer) => answer.selected);
};

export const selectIsQuestionValidated = (state: AppState) => {
  return selectQuestion(state)?.validated;
};

export const selectCanValidateAnswer = (state: AppState) => {
  return selectSelectedAnswer(state) !== undefined && selectIsQuestionValidated(state) === false;
};

export const selectAnswerCorrection = (state: AppState, answerId: string) => {
  if (!selectIsQuestionValidated(state)) {
    return AnswerCorrection.none;
  }

  const answer = selectAnswer(state, answerId);

  if (answer?.selected && !answer?.correct) {
    return AnswerCorrection.incorrect;
  }

  if (answer?.correct) {
    return AnswerCorrection.correct;
  }

  return AnswerCorrection.none;
};
