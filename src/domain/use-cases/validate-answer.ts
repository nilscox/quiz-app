import { Thunk } from '../../store/store-types';
import { setQuestionValidated } from '../actions';
import { selectQuestion, selectSelectedAnswer } from '../selectors';

export const validateAnswer = (): Thunk => {
  return async (dispatch, getState) => {
    const question = selectQuestion(getState());
    const selectedAnswer = selectSelectedAnswer(getState());

    if (!question) {
      throw new Error('The question is not set');
    }

    if (!selectedAnswer) {
      throw new Error('There is no selected answer');
    }

    await fetch(`/question/${question.id}/answer`, {
      method: 'POST',
      body: selectedAnswer.text,
    });

    dispatch(setQuestionValidated());
  };
};
