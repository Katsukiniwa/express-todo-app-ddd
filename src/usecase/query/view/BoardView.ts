interface Task {
  name: string;
  assignedUser: { name: string; icon: string },
  deadline: Date;
  point: number;
}

interface Member {
  name: string;
  icon: string;
}

export interface BoardViewProps {
  id: number
  boardName: string;
  taskList: Task[]; // ボード内のタスクのポイントの合計値
  pointSum: number;
  activeMemberList: Member[];
}

export class BoardView {
  public readonly id: number;
  public readonly name: string;
  public readonly activeMemberList: Member[];
  public readonly taskList: Task[];

  constructor(props: BoardViewProps) {
    this.id = props.id;
    this.name = props.boardName;
    this.activeMemberList = props.activeMemberList;
    this.taskList = props.taskList;
  }
}
