import { User } from "../model/user/User";

export interface UserAuthenticationService {
  authenticateFrom(userIdentity: string): User;

  /**
   * ハッシュ化したパスワードを返却する
   */
  encrypt(rawPassword: string): string;
}
