import { createAction } from '../libs/create-action';

import { Question, Answer } from './entities';

export const setQuestion = (question: Question) => {
  return createAction('setQuestion', { question });
};

export const setQuestionText = (text: string) => {
  return createAction('setQuestionText', { text });
};

export const addAnswer = (answer: Answer) => {
  return createAction('addAnswer', { answer });
};

export const setAnswerSelected = (answer: Answer, selected = true) => {
  return createAction('setAnswerSelected', { answer, selected });
};

export type AppAction = ReturnType<
  typeof setQuestion | typeof setQuestionText | typeof addAnswer | typeof setAnswerSelected
>;
