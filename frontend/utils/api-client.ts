export const BASE_API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3333/';

type apiOptions = {
  query: string;
  method: string;
  url: string;
  body: string;
  headers: HeadersInit;
};

export default class ApiClient {
  private readonly base_url: string;

  constructor() {
    this.base_url = BASE_API_URL;
  }

  async request(options: apiOptions) {
    let query = new URLSearchParams(options.query || {}).toString();
    if (query !== '') {
      query = '?' + query;
    }

    let response;
    try {
      response = await fetch(this.base_url + options.url + query, {
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });
    } catch (error) {
      let errorMessage: string;
      if (error instanceof Error) errorMessage = error.message;
      else errorMessage = String(error);

      response = {
        ok: false,
        status: 500,
        json: async () => {
          return {
            code: 500,
            message: 'The server is unresponsive',
            description: errorMessage,
          };
        },
      };
    }

    return response;
  }

  async get(url: string, query?: string, options?: any) {
    return this.request({ method: 'GET', url, query, ...options });
  }

  async post(url: string, query?: string, body?: any, options?: any) {
    return this.request({ method: 'POST', url, body, ...options });
  }

  async put(url: string, query?: string, body?: string, options?: any) {
    return this.request({ method: 'PUT', url, body, ...options });
  }

  async delete(url: string, query?: string, options?: any) {
    return this.request({ method: 'DELETE', url, ...options });
  }
}
