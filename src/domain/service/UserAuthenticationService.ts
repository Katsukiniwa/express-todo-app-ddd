import { User } from '../model/user/User'

export interface UserAuthenticationService {
  authenticateFrom(userIdentity: string, password: string): Promise<User>

  /**
   * ハッシュ化したパスワードを返却する
   */
  encrypt(rawPassword: string): string
}
