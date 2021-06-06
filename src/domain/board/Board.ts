import { Entity } from "../../ddd_common/Entity";

export class Board extends Entity<Board> {
  public readonly id: number | null;

  constructor(id: number | null) {
    super();
    this.id = id;
  }
}
