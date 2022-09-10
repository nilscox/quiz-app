import { Question, Answer } from '../entities';
import { QuestionPort } from '../ports/question-port';

export class StubQuestionAdapter implements QuestionPort {
  public answeredQuestion?: Question;
  public selectedAnswer?: Answer;

  async saveAnswer(question: Question, answer: Answer): Promise<void> {
    this.answeredQuestion = question;
    this.selectedAnswer = answer;
  }
}
