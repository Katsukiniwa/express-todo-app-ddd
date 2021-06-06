import { Entity } from "../../ddd_common/Entity";

export class User extends Entity<User> {
  public readonly id: number | null;

  constructor(id: number | null) {
    super();
    this.id = id;
  }
}
