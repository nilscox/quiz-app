import { Question, Answer } from '../../domain/entities';
import { QuestionPort } from '../../domain/ports/question-port';

export class HttpQuestionAdapter implements QuestionPort {
  async saveAnswer(question: Question, answer: Answer): Promise<void> {
    await fetch(`/question/${question.id}/answer`, {
      method: 'POST',
      body: answer.text,
    });
  }
}
