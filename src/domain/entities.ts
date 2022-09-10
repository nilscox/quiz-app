export type Question = {
  id: string;
  text: string;
  answers: Answer[];
};

export type Answer = {
  id: string;
  text: string;
  correct: boolean;
  selected: boolean;
};
