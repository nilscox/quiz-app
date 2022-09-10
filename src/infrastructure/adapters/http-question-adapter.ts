import { Question, Answer } from '../../domain/entities';
import { QuestionPort } from '../../domain/ports/question-port';

export type HttpResponse<Body> = {
  status: number;
  body: Body;
};

export interface HttpPort {
  get<ResponseBody>(url: string): Promise<HttpResponse<ResponseBody>>;
  post<RequestBody, ResponseBody>(url: string, body?: RequestBody): Promise<HttpResponse<ResponseBody>>;
}

export class HttpQuestionAdapter implements QuestionPort {
  constructor(private readonly httpAdapter: HttpPort) {}

  async saveAnswer(question: Question, answer: Answer): Promise<void> {
    await this.httpAdapter.post(`/question/${question.id}/answer`, answer.text);
  }
}
