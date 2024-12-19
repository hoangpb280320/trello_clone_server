export interface ApiResponse<T = undefined> {
  statusCode: number;
  message?: string;
  data?: T;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
