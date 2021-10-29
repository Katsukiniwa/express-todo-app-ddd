import { AddTaskToBoardRequest } from "../../infrastructure/router/request";

export class AddTaskToBoardCommand {
  public readonly taskName: string;
  public readonly content: string;
  public readonly deadline: Date;
  public readonly userId: number;
  public readonly boardId: number;
  public readonly point: number;

  constructor(props: AddTaskToBoardRequest) {
    if (!props.taskName) {
      throw new Error("task name not defined");
    }
    this.taskName = props.taskName;

    if (!props.content) {
      throw new Error("content not defined");
    }
    this.content = props.content;

    if(!props.deadline) {
      throw new Error("deadline not defined");
    }
    this.deadline = props.deadline;

    if (!props.userId) {
      throw new Error("userId not defined");
    }
    this.userId = Number(props.userId);

    if (!props.boardId) {
      throw new Error("boardId not defined");
    }
    this.boardId = Number(props.boardId);

    if (!props.point) {
      throw new Error("point not defined");
    }

    this.point = props.point;
  }
}
