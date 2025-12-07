// 登入 Request
export type LoginRequest = {
  email: string;
  password: string;
}

// 登入 Response
export type LoginResponse = {
  result: string;  
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