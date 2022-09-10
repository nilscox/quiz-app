import { setQuestion } from '../domain/actions';
import { selectAnswers } from '../domain/selectors';
import { configureTestStore } from '../domain/test/configure-test-store';
import { createAnswer, createQuestion } from '../domain/test/entity-creators';
import { AppStore } from '../store/store-types';

import { Answer } from './Answer';
import { fireEvent, render, screen } from './test/render';

describe('Answer', () => {
  const text = 'answer';
  const answer = createAnswer({ text });

  let store: AppStore;

  beforeEach(() => {
    store = configureTestStore();
  });

  it('displays an answer', () => {
    // ARRANGE
    render(<Answer answer={answer} />);

    // ASSERT
    expect(screen.getByText(text)).toBeVisible();
  });

  it("toggles an answer's selected flag", async () => {
    // ARRANGE
    store.dispatch(setQuestion(createQuestion({ answers: [answer] })));
    render(<Answer answer={answer} />, store);

    // ACT
    fireEvent.click(screen.getByLabelText(text));

    // ASSERT
    expect(selectAnswers(store.getState())).toHaveProperty('0.selected', true);
  });

  it('approves the answer when it was selected and the question is validated', async () => {
    // ARRANGE
    const answer = createAnswer({ text: 'correct', correct: true, selected: true });

    store.dispatch(setQuestion(createQuestion({ answers: [answer], validated: true })));
    render(<Answer answer={answer} />, store);

    // ASSERT
    expect(screen.getByText('correct')).toHaveStyle({ color: 'green' });
  });

  it('shows that the answer was incorrect when is was selected and the question is validated', async () => {
    // ARRANGE
    const answer = createAnswer({ text: 'incorrect', correct: false, selected: true });

    store.dispatch(setQuestion(createQuestion({ answers: [answer], validated: true })));
    render(<Answer answer={answer} />, store);

    // ASSERT
    expect(screen.getByText('incorrect')).toHaveStyle({ color: 'red' });
  });
});
