import { mockFn } from '../../domain/test/mock-fn';
import { mockedObject } from '../../domain/test/mocked-object';

import { FetchHttpAdapter } from './fetch-http-adapter';

const mockResponse = (status = 200, body?: string) => {
  return mockedObject<Response>({
    status,
    json: () => Promise.resolve(body),
  });
};

describe('FetchHttpAdapter', () => {
  const fetch = mockFn<typeof window.fetch>();
  const adapter = new FetchHttpAdapter(fetch);

  describe('get', () => {
    it('triggers a get request ', async () => {
      // ARRANGE
      fetch.mockResolvedValue(mockResponse());

      // ACT
      await adapter.get('url');

      // ASSERT
      expect(fetch).toHaveBeenCalledWith('url', {
        method: 'GET',
      });
    });

    it("returns the response's body", async () => {
      // ARRANGE
      fetch.mockResolvedValue(mockResponse(200, 'body'));

      // ACT / ASSERT
      const response = await adapter.get<string>('');

      // ASSERT
      expect(response).toEqual({ status: 200, body: 'body' });
    });
  });

  describe('post', () => {
    it('triggers a post request ', async () => {
      // ARRANGE
      fetch.mockResolvedValue(mockResponse());

      // ACT
      await adapter.post('url', 'body');

      // ASSERT
      expect(fetch).toHaveBeenCalledWith('url', {
        method: 'POST',
        body: '"body"',
      });
    });

    it("returns the response's body", async () => {
      // ARRANGE
      fetch.mockResolvedValue(mockResponse(201, 'body'));

      // ACT
      const response = await adapter.post('');

      // ASSERT
      expect(response).toEqual({
        status: 201,
        body: 'body',
      });
    });
  });
});
