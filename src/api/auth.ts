import { request } from './http';

export type AuthUser = {
  id: string | number;
  username: string;
};

type Credentials = {
  username: string;
  password: string;
};

export const login = (credentials: Credentials) =>
  request<AuthUser>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

export const register = (credentials: Credentials) =>
  request<AuthUser>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
