import { createAnswer, createQuestion } from '../../domain/test/entity-creators';
import { mockFn } from '../../domain/test/mock-fn';

import { HttpQuestionAdapter } from './http-question-adapter';

describe('HttpQuestionAdapter', () => {
  it("performs a call to fetch with a body containing the answer's text", async () => {
    // ARRANGE
    const answer = createAnswer({ text: '42' });
    const question = createQuestion({ id: 'questionId', answers: [answer] });

    const adapter = new HttpQuestionAdapter();

    window.fetch = mockFn();

    // ACT
    await adapter.saveAnswer(question, answer);

    // ASSERT
    expect(window.fetch).toHaveBeenCalledWith('/question/questionId/answer', {
      method: 'POST',
      body: '42',
    });
  });
});
