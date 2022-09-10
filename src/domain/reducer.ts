import { AppAction } from './actions';
import { Question } from './entities';

export const questionReducer = (state: Question | null = null, action: AppAction): Question | null => {
  if (action.type === 'setQuestion') {
    return action.question;
  }

  if (!state) {
    return null;
  }

  if (action.type === 'setQuestionText') {
    return {
      ...state,
      text: action.text,
    };
  }

  if (action.type === 'addAnswer') {
    return {
      ...state,
      answers: [...state.answers, action.answer],
    };
  }

  if (action.type === 'setAnswerSelected') {
    const answerIndex = state.answers.indexOf(action.answer);

    return {
      ...state,
      answers: [
        ...state.answers.slice(0, answerIndex),
        { ...state.answers[answerIndex], selected: action.selected },
        ...state.answers.slice(answerIndex + 1),
      ],
    };
  }

  return state;
};
