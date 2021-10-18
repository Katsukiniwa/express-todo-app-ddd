import { User } from "../model/user/User";

export interface UserAuthenticationService {
  authenticateFrom(userId: number, userIdentity: string): Promise<User>;

  /**
   * ハッシュ化したパスワードを返却する
   */
  encrypt(rawPassword: string): string;
}
