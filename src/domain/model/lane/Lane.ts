import { Entity } from '../../../ddd_common/domain/Entity'
import { Task } from '../task/Task'

export interface LaneProps {
  id: number | null
  name: string
  tasks: Task[]
}

/**
 * @name レーン
 * @description ボードに存在するレーン
 */
export class Lane extends Entity<Lane> {
  public readonly id: number | null
  private _name: string
  private _tasks: Task[]

  constructor(props: LaneProps) {
    super()

    this.id = props.id
    this._name = props.name
    this._tasks = props.tasks
  }

  get name(): string {
    return this._name
  }

  get tasks(): Task[] {
    return this._tasks
  }
}
