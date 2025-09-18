export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface HttpRequest<TBody = unknown> {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: TBody;
}

export interface HttpResponse<TData = unknown> {
  status: number;
  message: string;
  data?: TData;
}
