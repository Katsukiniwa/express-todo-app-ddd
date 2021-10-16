import { Entity } from "../../../ddd_common/domain/Entity";
import { User } from "../user/User";
import { TaskName } from "./TaskName";

export interface TaskProps {
  id: number | null;
  name: string;
  assignedUser: User | null;
  deadline: Date;
}

/**
 * @name タスク
 * @description ボードに置かれているタスク。Trelloのカードをイメージしてる。
 */
export class Task extends Entity<Task> {
  public readonly id: number | null;
  public readonly name: TaskName;
  public readonly assignedUser: User | null;
  public readonly deadline: Date;

  constructor(props: TaskProps) {
    super();
    this.id = props.id;
    this.name = new TaskName(props.name);
    this.assignedUser = props.assignedUser;
    this.deadline = props.deadline;
  }
}
