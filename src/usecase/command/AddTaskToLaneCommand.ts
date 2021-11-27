export interface AddTaskToLaneCommandProps {
  boardId: number
  laneId: number
  taskName: string
}
export class AddTaskToLaneCommand {
  public readonly boardId: number
  public readonly laneId: number
  public readonly taskName: string

  constructor(props: AddTaskToLaneCommandProps) {
    this.boardId = props.boardId
    this.laneId = props.laneId
    this.taskName = props.taskName
  }
}
