export class AuthPath {
  // 認證 API 基礎路徑
  public static readonly AUTH = '/auth';
  // 註冊帳號
  public static readonly AUTH_REGISTER = `${this.AUTH}/register`; 
  // 登入帳號
  public static readonly AUTH_LOGIN = `${this.AUTH}/login`; 
  // 換新 access token
  public static readonly AUTH_REFRESH = `${this.AUTH}/refresh`; 
  // 登出使用者
  public static readonly AUTH_LOGOUT = `${this.AUTH}/logout`; 
}