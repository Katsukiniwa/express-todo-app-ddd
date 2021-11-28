import { CommandHandler } from '../../ddd_common/usecase/CommandHandler'
import { Board } from '../../domain/model/board/Board'
import { BoardRepository } from '../../domain/model/board/BoardRepository'
import { Owner } from '../../domain/model/board/Owner'
import { UserRepository } from '../../domain/model/user/UserRepository'
import { CreateBoardCommand } from './CreateBoardCommand'

export class CreateBoardCommandHandler
  implements CommandHandler<CreateBoardCommand>
{
  private userRepository: UserRepository
  private boardRepository: BoardRepository

  constructor(
    userRepository: UserRepository,
    boardRepository: BoardRepository
  ) {
    this.userRepository = userRepository
    this.boardRepository = boardRepository
  }

  async handle(command: CreateBoardCommand) {
    const owner = await this.userRepository.findById(command.ownerId)

    if (owner == null) {
      throw new Error('owner not found')
    }

    /**
     * TODO: Factory経由で生成する
     */
    const board = new Board({
      id: null,
      name: command.name,
      owner: new Owner({ id: owner.id, name: owner.name, icon: owner.icon }),
      tasks: [],
      lanes: [],
      activeMemberIdList: [],
      invitationMemberIdList: [],
    })

    this.boardRepository.store(board)
  }
}
