import { Entity } from "../../../src/ddd_common/Entity";
import { BoardMemberName } from "./BoardMemberName";

export class BoardMember extends Entity<BoardMember> {
  public readonly id: number | null;
  public readonly name: BoardMemberName;
}
