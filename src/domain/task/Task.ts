import { Entity } from "../../ddd_common/Entity";

export class Task extends Entity<Task> {
  public readonly id: number | null;

  constructor(id: number | null) {
    super();
    this.id = id;
  }
}
