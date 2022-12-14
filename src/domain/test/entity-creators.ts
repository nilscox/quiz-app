import { Answer, Question } from '../entities';

type Factory<T> = (overrides?: Partial<T>) => T;

const randomId = () => {
  return Math.random().toString(36).slice(-6);
};

export const createQuestion: Factory<Question> = (overrides = {}) => ({
  id: randomId(),
  text: '',
  answers: [],
  validated: false,
  ...overrides,
});

export const createAnswer: Factory<Answer> = (overrides = {}) => ({
  id: randomId(),
  text: '',
  correct: false,
  selected: false,
  ...overrides,
});
