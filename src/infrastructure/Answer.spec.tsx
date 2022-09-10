import { setQuestion } from '../domain/actions';
import { selectAnswers } from '../domain/selectors';
import { configureTestStore } from '../domain/test/configure-test-store';
import { createAnswer, createQuestion } from '../domain/test/entity-creators';

import { Answer } from './Answer';
import { fireEvent, render, screen } from './test/render';

describe('Answer', () => {
  const text = 'answer';
  const answer = createAnswer({ text });

  it('displays an answer', () => {
    // ARRANGE
    render(<Answer answer={answer} />);

    // ASSERT
    expect(screen.getByText(text)).toBeVisible();
  });

  it("toggles an answer's selected flag", async () => {
    // ARRANGE
    const store = configureTestStore();

    store.dispatch(setQuestion(createQuestion({ answers: [answer] })));
    render(<Answer answer={answer} />, store);

    // ACT
    fireEvent.click(screen.getByLabelText(text));

    // ASSERT
    expect(selectAnswers(store.getState())).toHaveProperty('0.selected', true);
  });
});
