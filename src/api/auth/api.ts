import { type AxiosResponse } from "axios";
import { AXIOS } from "@/stores/setupAxios";
import { AuthPath } from "./path";
import type { LoginRequest, LoginResponse } from "@/types/auth";
import ApiHandleError from "@/utils/apiHandleError";


// 登入 POST /auth/login
export async function login(req: LoginRequest) {
  try {
    const res: AxiosResponse<LoginResponse> = await AXIOS.post(
      AuthPath.AUTH_LOGIN,
      req
    );
    return res.data;
  } catch (error) {
    ApiHandleError(error, login.name);
  }
}
