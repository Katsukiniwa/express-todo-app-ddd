export interface CreateBoardCommandProps {
  name: string
  ownerId: number
}

export class CreateBoardCommand {
  public readonly name: string
  public readonly ownerId: number

  constructor(props: CreateBoardCommand) {
    this.name = props.name
    this.ownerId = props.ownerId
  }
}
