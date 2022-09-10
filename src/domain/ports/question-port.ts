import { Question, Answer } from '../entities';

export interface QuestionPort {
  saveAnswer(question: Question, answer: Answer): Promise<void>;
}
