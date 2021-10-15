import { Aggregate } from "../../ddd_common/AggregateRoot";
import { Task } from "../task/Task";
import { User } from "../user/User";
import { BoardName } from "./BoardName";

export interface BoardProps {
  id: number | null;
  name: string;
  activeMemberIdList: number[];
  tasks: Task[];
}

/**
 * @name ボード
 * @description Trelloのボードをイメージしている
 */
export class Board extends Aggregate<Board> {
  public readonly id: number | null;
  private name: BoardName;
  
  /**
   * ボードへの招待メールを確認済みのメンバーの識別子配列
   */
  private activeMemberIdList: number[];

  /**
   * ボードへの招待メールを送信済みのメンバーの識別子の配列
   */
  private invitationMemberIdList: number[];
  
  private tasks: Task[];

  constructor(props: BoardProps) {
    super();
    this.id = props.id;
    this.name = new BoardName(props.name);
    this.activeMemberIdList = props.activeMemberIdList;
    this.tasks = props.tasks;
  }

  public changeName(newName: string): void {
    this.name = new BoardName(newName);
  }

  /**
   * メンバーをボードに招待するメソッド
   */
  public inviteMember(userId: number): void {
    this.invitationMemberIdList.push(userId);
    /**
     * TODO: メンバー招待のドメインイベントの保存を実装する可能性あり
     */
  }

  /**
   * ユーザが招待メールのリンクをクリックした時に呼ばれるメソッド
   */
  public confirmInvitation(userId: number): void {
    this.invitationMemberIdList.filter(e => e !== userId);
    this.activeMemberIdList.push(userId);
  }

  public addTask(taskName: string, user: User, deadline: Date): void {
    const task = new Task(null, taskName, user, deadline);
    this.tasks.push(task);
  }
}
