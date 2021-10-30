import { Entity } from '../../../ddd_common/domain/Entity'
import { BoardMemberName } from './BoardMemberName'

export class BoardMember extends Entity<BoardMember> {
  public readonly id: number | null
  public readonly name: BoardMemberName
}
