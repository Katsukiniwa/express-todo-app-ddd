import { Entity } from "../../ddd_common/Entity";
import { Task } from "../task/Task";
import { User } from "../user/User";
import { BoardMember } from "./BoardMember";
import { BoardName } from "./BoardName";

export class Board extends Entity<Board> {
  public readonly id: number | null;
  public readonly name: BoardName;
  public readonly members: BoardMember[];
  public readonly tasks: Task[];

  constructor(id: number | null, name: string, members: BoardMember[], tasks: Task[]) {
    super();
    this.id = id;
    this.name = new BoardName(name);
    this.members = members;
    this.tasks = tasks;
  }

  public addTask(taskName: string, user: User, deadline: Date) {
    const task = new Task(null, taskName, user, deadline);
    this.tasks.push(task);
  }
}
