import { createAnswer, createQuestion } from '../../domain/test/entity-creators';
import { mockFn } from '../../domain/test/mock-fn';

import { HttpPort, HttpQuestionAdapter } from './http-question-adapter';

class MockHttpAdapter implements HttpPort {
  get = mockFn() as HttpPort['get'];
  post = mockFn() as HttpPort['post'];
}

describe('HttpQuestionAdapter', () => {
  it("performs a call to fetch with a body containing the answer's text", async () => {
    // ARRANGE
    const answer = createAnswer({ text: '42' });
    const question = createQuestion({ id: 'questionId', answers: [answer] });

    const mockHttpAdapter = new MockHttpAdapter();
    const adapter = new HttpQuestionAdapter(mockHttpAdapter);

    // ACT
    await adapter.saveAnswer(question, answer);

    // ASSERT
    expect(mockHttpAdapter.post).toHaveBeenCalledWith('/question/questionId/answer', '42');
  });
});
