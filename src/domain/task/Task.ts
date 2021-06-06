import { Entity } from "../../ddd_common/Entity";
import { User } from "../user/User";
import { TaskName } from "./TaskName";

export class Task extends Entity<Task> {
  public readonly id: number | null;
  public readonly name: TaskName;
  public readonly assignedUser: User | null;
  public readonly deadline: Date;

  constructor(
    id: number | null,
    name: string,
    assignedUser: User | null,
    deadline: Date
  ) {
    super();
    this.id = id;
    this.name = new TaskName(name);
    this.assignedUser = assignedUser;
    this.deadline = deadline;
  }
}
