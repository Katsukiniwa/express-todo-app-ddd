import { CommandHandler } from '../../ddd_common/usecase/CommandHandler'
import { BoardRepository } from '../../domain/model/board/BoardRepository'
import { UpdateLaneAttributesCommand } from './UpdateLaneAttributesCommand'

export class UpdateLaneAttributesCommandHandler
  implements CommandHandler<UpdateLaneAttributesCommand>
{
  private boardRepository: BoardRepository

  constructor(boardRepository: BoardRepository) {
    this.boardRepository = boardRepository
  }

  async handle(command: UpdateLaneAttributesCommand): Promise<void> {
    const board = await this.boardRepository.findById(command.boardId)
    if (!board) {
      throw new Error('board not found')
    }

    const lane = board?.findLaneById(command.laneId)
    if (!lane) {
      throw new Error('lane not found')
    }

    if (command.name) {
      lane.changeName(board.laneNameList(), command.name)
    }

    if (command.coverImage) {
      lane.changeCoverImage(command.coverImage)
    }

    this.boardRepository.store(board)
  }
}
