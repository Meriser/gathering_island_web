import type { ApiResponse } from "./api";

// 註冊 Request
export type RegisterRequest = {
  email: string;
  password: string;
  displayName: string;
}
// 註冊 Response
export type RegisterResponse = ApiResponse & {
  sub: number;
  email: string;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// 登入 Request
export type LoginRequest = {
  email: string;
  password: string;
}
// 登入 Response
export type LoginResponse = ApiResponse & {
  payload: {
    sub: number;
    email: string;
    username: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
  refreshToken: string;
}