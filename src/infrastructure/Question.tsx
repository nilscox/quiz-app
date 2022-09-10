import { FormEventHandler, useCallback } from 'react';

import { selectCanSelectAnswer, selectCanValidateAnswer, selectQuestion } from '../domain/selectors';
import { validateAnswer } from '../domain/use-cases/validate-answer';

import { Answer } from './Answer';
import { useAppDispatch } from './hooks/use-app-dispatch';
import { useAppSelector } from './hooks/use-app-selector';

export const Question = () => {
  const dispatch = useAppDispatch();
  const question = useAppSelector(selectQuestion);
  const canSelectAnswer = useAppSelector(selectCanSelectAnswer);
  const canValidateAnswer = useAppSelector(selectCanValidateAnswer);

  const handleSubmit = useCallback<FormEventHandler>(
    (event) => {
      event.preventDefault();
      dispatch(validateAnswer());
    },
    [dispatch],
  );

  if (question === null) {
    return <p className="text-secondary fw-semibold">There is no question.</p>;
  }

  return (
    <form className="container p-4 bg-white shadow rounded" style={{ maxWidth: 800 }} onSubmit={handleSubmit}>
      <fieldset className="d-flex flex-column" disabled={!canSelectAnswer}>
        <p className="fw-medium fs-3">{question.text}</p>

        <ul>
          {question.answers.map((answer) => (
            <Answer key={answer.id} answer={answer} />
          ))}
        </ul>

        <button type="submit" disabled={!canValidateAnswer} className="btn btn-primary align-self-end">
          Valider
        </button>
      </fieldset>
    </form>
  );
};
