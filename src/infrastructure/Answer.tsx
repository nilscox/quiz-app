import { toggleAnswer } from '../domain/use-cases/toggle-answer';

import { useAppDispatch } from './hooks/use-app-dispatch';
import { AnswerType } from './types';

type AnswerProps = {
  answer: AnswerType;
};

export const Answer = ({ answer }: AnswerProps) => {
  const id = `answer-${answer.id}`;
  const dispatch = useAppDispatch();

  return (
    <li className="d-flex align-items-center gap-2">
      <input
        style={{ width: '1rem', height: '1rem' }}
        type="checkbox"
        id={id}
        checked={answer.selected}
        onChange={() => dispatch(toggleAnswer(answer))}
      />
      <label className="fs-5" style={{ userSelect: 'none' }} htmlFor={id}>
        {answer.text}
      </label>
    </li>
  );
};
