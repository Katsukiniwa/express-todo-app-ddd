import { Aggregate } from "../../ddd_common/domain/AggregateRoot";
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
  private _name: BoardName;
  
  /**
   * ボードへの招待メールを確認済みのメンバーの識別子配列
   */
  private _activeMemberIdList: number[];

  /**
   * ボードへの招待メールを送信済みのメンバーの識別子の配列
   */
  private _invitationMemberIdList: number[];
  
  private _tasks: Task[];

  constructor(props: BoardProps) {
    super();
    this.id = props.id;
    this._name = new BoardName(props.name);
    this._activeMemberIdList = props.activeMemberIdList;
    this._tasks = props.tasks;
  }

  get name(): BoardName {
    return this._name;
  }

  get activeMemberIdList(): number[] {
    return this._activeMemberIdList;
  }

  get invitationMemberIdList(): number[] {
    return this._invitationMemberIdList;
  }

  get tasks(): Task[] {
    return this._tasks;
  }

  public changeName(newName: string): void {
    this._name = new BoardName(newName);
  }

  /**
   * メンバーをボードに招待するメソッド
   */
  public inviteMember(userId: number): void {
    this._invitationMemberIdList.push(userId);
    /**
     * TODO: メンバー招待のドメインイベントの保存を実装する可能性あり
     */
  }

  /**
   * ユーザが招待メールのリンクをクリックした時に呼ばれるメソッド
   */
  public confirmInvitation(userId: number): void {
    this._invitationMemberIdList.filter(e => e !== userId);
    this._activeMemberIdList.push(userId);
  }

  /**
   * ボードにタスクを追加するメソッド
   */
  public addTask(
    { id, taskName, assignedUser, deadline }:
    { id: number | null, taskName: string, assignedUser: User | null, deadline: Date }
  ): void {
    const task = new Task({ id, name: taskName, assignedUser, deadline });
    this._tasks.push(task);
  }
}
