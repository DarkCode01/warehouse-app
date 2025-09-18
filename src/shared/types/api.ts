export type ApiResponse<T> = {
  data: T;
  error?: string;
  status: number;
};

export type ApiError = {
  message: string;
  code?: string | number;
  details?: unknown;
};
