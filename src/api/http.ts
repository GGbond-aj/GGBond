type ApiErrorPayload = {
  detail?: string;
  message?: string;
};

export const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

  const body = await response.json().catch(() => ({} as ApiErrorPayload));
  if (!response.ok) {
    const error = body as ApiErrorPayload;
    throw new ApiError(error.detail || error.message || '请求失败，请稍后重试', response.status);
  }

  return body as T;
}
