import { User } from './User'

export interface UserRepository {
  findById(id: number): Promise<User>
  store(user: User): Promise<void>
}
