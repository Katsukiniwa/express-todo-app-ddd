interface Task {
  name: string
  assignedUser: Member | null
  deadline: Date
  point: number
}

interface Member {
  id: number
  name: string
  icon: string
}

export interface BoardViewProps {
  id: number
  name: string
  taskList: Task[]

  /**
   * @description ボード内のタスクのポイントの合計値
   */
  pointSum: number

  activeMemberList: Member[]
}

export class BoardView {
  public readonly id: number
  public readonly name: string
  public readonly taskList: Task[]
  public readonly pointSum: number
  public readonly activeMemberList: Member[]

  constructor(props: BoardViewProps) {
    this.id = props.id
    this.name = props.name
    this.taskList = props.taskList
    this.pointSum = props.pointSum
    this.activeMemberList = props.activeMemberList
  }
}
