import { Entity } from "../../ddd_common/Entity";

export class User extends Entity<User> {
  public readonly id: number | null;
  public readonly name: string;
  public readonly email: string;

  constructor(id: number | null, name: string, email: string) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
