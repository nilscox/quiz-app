import { Thunk } from '../../store/store-types';
import { setAnswerSelected } from '../actions';
import { Answer } from '../entities';
import { selectSelectedAnswer } from '../selectors';

export const toggleAnswer = (answer: Answer): Thunk => {
  return (dispatch, getState) => {
    // we use a selector to retrieve the currently selected answer (if any)
    const selectedAnswer = selectSelectedAnswer(getState());

    // if the given answer is the one that is already selected, we mark it as unselected and we're done
    if (answer === selectedAnswer) {
      dispatch(setAnswerSelected(answer, false));
      return;
    }

    // if there was an answer already selected, we mark it as unselected
    if (selectedAnswer) {
      dispatch(setAnswerSelected(selectedAnswer, false));
    }

    // we mark the given answer as selected
    dispatch(setAnswerSelected(answer, true));
  };
};
