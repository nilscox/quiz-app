import { setQuestion } from '../domain/actions';
import { configureTestStore } from '../domain/test/configure-test-store';
import { createAnswer, createQuestion } from '../domain/test/entity-creators';
import { StubQuestionAdapter } from '../domain/test/stub-question-adapter';

import { Question } from './Question';
import { act, render, screen, userEvent } from './test/render';

describe('Question', () => {
  const answer = createAnswer({ text: 'answer', selected: true });
  const question = createQuestion({ text: 'question', answers: [answer] });

  it('displays a question', () => {
    // ARRANGE
    const store = configureTestStore();

    store.dispatch(setQuestion(question));
    render(<Question />, store);

    // ASSERT
    expect(screen.getByText(question.text)).toBeVisible();
    expect(screen.getByText(answer.text)).toBeVisible();
  });

  it('shows a fallback message when no question is set', () => {
    // ARRANGE
    const store = configureTestStore();

    render(<Question />, store);

    // ASSERT
    expect(screen.getByText('There is no question.')).toBeVisible();
  });

  it('validates a selected answer', async () => {
    // ARRANGE
    const user = userEvent.setup();
    const questionAdapter = new StubQuestionAdapter();
    const store = configureTestStore({ questionAdapter });

    store.dispatch(setQuestion(question));
    render(<Question />, store);

    // ACT
    await act(() => user.click(screen.getByRole('button', { name: 'Valider' })));

    // ASSERT
    expect(questionAdapter.answeredQuestion).toBeDefined();
  });
});
