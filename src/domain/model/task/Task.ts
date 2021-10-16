import { Entity } from "../../../ddd_common/domain/Entity";
import { User } from "../user/User";
import { TaskName } from "./TaskName";

export interface TaskProps {
  id: number | null;
  name: string;
  assignedUser: User | null;
  deadline: Date;
  point: number;
}

/**
 * @name タスク
 * @description ボードに置かれているタスク。Trelloのカードをイメージしてる。
 */
export class Task extends Entity<Task> {
  public readonly id: number | null;
  private _name: TaskName;

  /**
   * @name 担当者
   */
  private _assignedUser: User | null;
  
  /**
   * @name 締め切り
   * @memo 締め切りというValue Objectに切り出せる
   */
  private _deadline: Date;
  
  /**
   * @name ポイント
   * @description スクラムにおける消化ポイントの概念
   */
  private point: number;

  constructor(props: TaskProps) {
    super();
    this.id = props.id;
    this._name = new TaskName(props.name);
    this._assignedUser = props.assignedUser;
    this._deadline = props.deadline;
  }

  /**
   * 担当者のいないタスクにユーザをアサインするメソッド
   */
  public assignUser(user: User): void {
    if (this._assignedUser != null) {
      throw new Error("既に別のユーザがアサインされています");
    }
    this._assignedUser = user;
  }

  /**
   * 担当者を別のユーザに変更するメソッド
   */
  public changeAssignedUser(user: User): void {
    if (this._assignedUser == null) {
      throw new Error("ユーザがアサインされていません");
    }
    this._assignedUser = user;
  }
}