import { Entity } from "../../ddd_common/Entity";

export class Label extends Entity<Label> {
  public readonly id: number | null;

  constructor(id: number | null) {
    super();
    this.id = id;
  }
}
