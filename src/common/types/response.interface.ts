import { User } from 'src/entities';

export interface ApiResponse<T = undefined> {
  statusCode: number;
  message?: string;
  data?: T;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  token: string;
  user: Partial<User>;
}
