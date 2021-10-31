import { Entity } from '../../../ddd_common/domain/Entity'
import { BoardMemberName } from './BoardMemberName'

export interface BoardMemberProps {
  id: number | null
  name: string
}

export class BoardMember extends Entity<BoardMember> {
  public readonly id: number | null
  private _name: BoardMemberName

  constructor(props: BoardMemberProps) {
    super()
    this.id = props.id
    this._name = new BoardMemberName(props.name)
  }

  get name(): BoardMemberName {
    return this._name
  }
}
