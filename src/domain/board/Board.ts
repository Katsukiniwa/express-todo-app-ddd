import { Entity } from "../../ddd_common/Entity";
import { BoardMember } from "./BoardMember";
import { BoardName } from "./BoardName";

export class Board extends Entity<Board> {
  public readonly id: number | null;
  public readonly name: BoardName;
  public readonly members: BoardMember[];

  constructor(id: number | null, name: string, members: BoardMember[]) {
    super();
    this.id = id;
    this.name = new BoardName(name);
    this.members = members;
  }
}
