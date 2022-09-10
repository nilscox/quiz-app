import { Question, Answer } from './entities';

type Action<Type extends string, Payload> = { type: Type } & Payload;

const createAction = <Type extends string, Payload>(type: Type, payload?: Payload) => {
  return { type, ...payload } as Action<Type, Payload>;
};

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

export const setQuestionValidated = (validated = true) => {
  return createAction('setQuestionValidated', { validated });
};

export type AppAction = ReturnType<
  | typeof setQuestion
  | typeof setQuestionText
  | typeof addAnswer
  | typeof setAnswerSelected
  | typeof setQuestionValidated
>;
