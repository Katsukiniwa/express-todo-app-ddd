import { User } from "./User";

export interface UserRepository {
  findById(id: number): User;
  store(user: User): void;
}
