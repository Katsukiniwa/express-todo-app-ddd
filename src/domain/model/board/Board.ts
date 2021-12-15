import { Aggregate } from '../../../ddd_common/domain/AggregateRoot'
import { Lane } from '../lane/Lane'
import { Task } from '../task/Task'
import { User } from '../user/User'
import { BoardName } from './BoardName'
import { Owner } from './Owner'

export interface BoardProps {
  id: number | null
  name: string
  activeMemberIdList: number[]
  invitationMemberIdList: number[]
  owner: Owner
  lanes: Lane[]
}

/**
 * @name ボード
 * @description Trelloのボードをイメージしている
 */
export class Board extends Aggregate<Board> {
  public readonly id: number | null
  private _name: BoardName

  /**
   * ボードへの招待メールを確認済みのメンバーの識別子配列
   */
  private _activeMemberIdList: number[]

  /**
   * ボードへの招待メールを送信済みのメンバーの識別子の配列
   */
  private _invitationMemberIdList: number[]

  private _owner: Owner

  private _lanes: Lane[]

  constructor(props: BoardProps) {
    super()
    this.id = props.id
    this._name = new BoardName(props.name)
    this._activeMemberIdList = props.activeMemberIdList
    this._invitationMemberIdList = props.invitationMemberIdList
    this._owner = props.owner
    this._lanes = props.lanes
  }

  get name(): BoardName {
    return this._name
  }

  get activeMemberIdList(): number[] {
    return this._activeMemberIdList
  }

  get invitationMemberIdList(): number[] {
    return this._invitationMemberIdList
  }

  get owner(): Owner {
    return this._owner
  }

  get lanes(): Lane[] {
    return this._lanes
  }

  public changeName(newName: string): void {
    this._name = new BoardName(newName)
  }

  /**
   * メンバーをボードに招待するメソッド
   */
  public inviteMember(userId: number): void {
    this._invitationMemberIdList.push(userId)
    /**
     * TODO: メンバー招待のドメインイベントの保存を実装する可能性あり
     */
  }

  /**
   * ユーザが招待メールのリンクをクリックした時に呼ばれるメソッド
   */
  public confirmInvitation(userId: number): void {
    this._invitationMemberIdList.filter((e) => e !== userId)
    this._activeMemberIdList.push(userId)
  }

  public findLaneById(laneId: number): Lane | undefined {
    return this._lanes.find((lane) => lane.id === laneId)
  }

  public laneNameList(): string[] {
    return this._lanes.map((lane) => lane.name)
  }

  /**
   * ボードにタスクを追加するメソッド
   */
  public addTask({
    laneId,
    taskName,
    content,
    assignedUser,
    deadline,
    point,
  }: {
    laneId: number
    taskId: null
    taskName: string
    content: string
    assignedUser: User | null
    deadline: Date
    point: number
  }): void {
    const task = new Task({
      id: null,
      name: taskName,
      content,
      assignedUser,
      deadline,
      point,
    })
    const lane = this.lanes.find((l) => l.id === laneId)
    if (!lane) throw new Error('lane not found')
    lane.addTask(task)
  }
}
