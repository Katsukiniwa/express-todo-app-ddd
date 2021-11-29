export interface UpdateLaneAttributesCommandProps {
  boardId: number
  laneId: number
  name?: string
  coverImage?: string
}
export class UpdateLaneAttributesCommand {
  public readonly boardId: number
  public readonly laneId: number
  public readonly name?: string
  public readonly coverImage?: string

  constructor(props: UpdateLaneAttributesCommand) {
    this.boardId = props.boardId
    this.laneId = props.laneId
    this.name = props.name
    this.coverImage = props.coverImage
  }
}
