import { useMutation } from "@tanstack/vue-query";
import { login, register } from "./api";
import type { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse } from "@/types/auth";

// 註冊 
export const useRegister = () => {
  return useMutation({
    mutationFn: (req: RegisterRequest) => register(req),
    onSuccess: (res: RegisterResponse) => res.result === "success",
  });
};

// 登入
export const useLogin = (successCB: (res: LoginResponse) => void) => {
  return useMutation({
    mutationFn: (req: LoginRequest) => login(req),
    onSuccess: successCB,
  });
};
