import { AppState } from '../store/store-types';

export const selectQuestion = (state: AppState) => {
  return state.question;
};

export const selectAnswers = (state: AppState) => {
  return selectQuestion(state)?.answers;
};

export const selectAnswersMatching = (state: AppState, re: RegExp) => {
  return selectAnswers(state)?.filter((answer) => answer.text.match(re));
};

export const selectCorrectAnswer = (state: AppState) => {
  return selectAnswers(state)?.find((answer) => answer.correct);
};

export const selectSelectedAnswer = (state: AppState) => {
  return selectAnswers(state)?.find((answer) => answer.selected);
};
