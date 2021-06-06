import { ValueObject } from "../../../src/ddd_common/ValueObject";

export class TaskName extends ValueObject<TaskName> {
  public readonly name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
