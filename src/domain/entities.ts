export type Question = {
  id: string;
  text: string;
  answers: Answer[];
  validated: boolean;
};

export type Answer = {
  id: string;
  text: string;
  correct: boolean;
  selected: boolean;
};

export enum AnswerCorrection {
  none = 'none',
  correct = 'correct',
  incorrect = 'incorrect',
}
