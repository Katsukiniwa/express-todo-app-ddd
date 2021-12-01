import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { AuthenticationError } from '../../cross_cutting_concern/error'

/**
 * JWTを検証する関数
 * TODO: userIdを返すように修正する
 * ログインしてから出ないと実行できないAPIを含む全てのrouterはこの関数を含んだ上で作成すること
 */
export function verifyJwtHandler(token: string): string | JwtPayload {
  const publicJwk = process.env.PUBLIC_JWK as Secret
  try {
    const payload = jwt.verify(token, publicJwk)
    return payload
  } catch (error) {
    if (error instanceof Error) {
      throw new AuthenticationError(error.message)
    }
    throw error
  }
}
