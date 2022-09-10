import { QuestionPort } from '../ports/question-port';

import { mockFn } from './mock-fn';

export class MockQuestionAdapter implements QuestionPort {
  saveAnswer = mockFn<QuestionPort['saveAnswer']>();
}
