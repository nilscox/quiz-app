import { Question, Answer } from '../../domain/entities';
import { QuestionPort } from '../../domain/ports/question-port';

export class LocalStorageQuestionAdapter implements QuestionPort {
  constructor(private readonly localStorage = window.localStorage) {}

  async saveAnswer(question: Question, answer: Answer): Promise<void> {
    this.localStorage.setItem(
      'answer',
      JSON.stringify({
        questionId: question.id,
        answerText: answer.text,
      }),
    );
  }
}
