import { createAnswer, createQuestion } from '../../domain/test/entity-creators';
import { mockFn } from '../../domain/test/mock-fn';
import { mockedObject } from '../../domain/test/mocked-object';

import { LocalStorageQuestionAdapter } from './local-storage-question-adapter';

describe('LocalStorageQuestionAdapter', () => {
  it('saves the question and the answer to the local storage', async () => {
    const setItem = mockFn<Storage['setItem']>();
    const mockStorage = mockedObject<Storage>({ setItem });

    const answer = createAnswer({ text: '42' });
    const question = createQuestion({ id: 'questionId', answers: [answer] });

    const adapter = new LocalStorageQuestionAdapter(mockStorage);

    await adapter.saveAnswer(question, answer);

    expect(setItem).toHaveBeenCalledWith('answer', '{"questionId":"questionId","answerText":"42"}');
  });
});
