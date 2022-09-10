import { AnswerCorrection } from '../domain/entities';
import { selectAnswerCorrection } from '../domain/selectors';
import { toggleAnswer } from '../domain/use-cases/toggle-answer';

import { useAppDispatch } from './hooks/use-app-dispatch';
import { useAppSelector } from './hooks/use-app-selector';
import { AnswerType } from './types';

type AnswerProps = {
  answer: AnswerType;
};

export const Answer = ({ answer }: AnswerProps) => {
  const dispatch = useAppDispatch();
  const correction = useAppSelector(selectAnswerCorrection, answer.id);

  const id = `answer-${answer.id}`;

  return (
    <li className="d-flex align-items-center gap-2">
      <input
        style={{ width: '1rem', height: '1rem' }}
        type="checkbox"
        id={id}
        checked={answer.selected}
        onChange={() => dispatch(toggleAnswer(answer))}
      />
      <label
        className="fs-5"
        style={{ userSelect: 'none', color: answerCorrectionColorMap[correction] }}
        htmlFor={id}
      >
        {answer.text}
      </label>
    </li>
  );
};

const answerCorrectionColorMap: Record<AnswerCorrection, string | undefined> = {
  [AnswerCorrection.none]: undefined,
  [AnswerCorrection.correct]: 'green',
  [AnswerCorrection.incorrect]: 'red',
};
