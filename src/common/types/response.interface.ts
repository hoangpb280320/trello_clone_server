import { Board, User } from 'src/entities';
import { Background } from 'src/entities/background.entity';

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

export interface BoardResponse {
  board: Partial<Board>;
}

export interface BoardsResponse {
  boards: Board[];
}

export interface BackgroundResponse {
  background: Background;
}

export interface BackgroundsResponse {
  backgrounds: Background[];
}
