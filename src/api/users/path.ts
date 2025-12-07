export class UsersPath {
  // 使用者 API 基礎路徑
  public static readonly USERS = '/users';
  // 取得或更新登入者的資訊
  public static readonly USERS_ME = `${this.USERS}/me`;
}
