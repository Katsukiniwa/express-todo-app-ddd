import { ValueObject } from "../../../ddd_common/domain/ValueObject";

export class TaskName extends ValueObject<TaskName> {
  public readonly name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
