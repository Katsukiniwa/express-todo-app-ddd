import { ValueObject } from "../../../src/ddd_common/ValueObject";

export class BoardMemberName extends ValueObject<BoardMemberName> {
  public readonly name: string;

  constructor(name: string) {
    super();

    if (name.length < 5 || name.length > 100) {
      throw new Error("ボード名の長さが不正です");
    }
  }
}
