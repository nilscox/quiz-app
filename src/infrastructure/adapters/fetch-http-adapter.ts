import { HttpPort, HttpResponse } from './http-question-adapter';

export class FetchHttpAdapter implements HttpPort {
  constructor(private fetch = window.fetch) {}

  async get<ResponseBody>(url: string): Promise<HttpResponse<ResponseBody>> {
    return this.request('GET', url);
  }

  async post<RequestBody, ResponseBody>(
    url: string,
    body?: RequestBody,
  ): Promise<HttpResponse<ResponseBody>> {
    return this.request('POST', url, body);
  }

  private async request<RequestBody, ResponseBody>(
    method: string,
    url: string,
    body?: RequestBody,
  ): Promise<HttpResponse<ResponseBody>> {
    const response = await this.fetch(url, {
      method,
      body: JSON.stringify(body),
    });

    return {
      status: response.status,
      body: await response.json(),
    };
  }
}
