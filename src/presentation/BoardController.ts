import { BoardRepository } from '../domain/model/board/BoardRepository'
import { UserRepository } from '../domain/model/user/UserRepository'
import { AddTaskToBoardCommand } from '../usecase/command/AddTaskToBoardCommand'
import { AddTaskToBoardCommandHandler } from '../usecase/command/AddTaskToBoardCommandHandler'
import { GetBoardQueryHandler } from '../usecase/query/GetBoardQueryHandler'
import { BoardView } from '../usecase/query/view/BoardView'

export class BoardController {
  private getBoardQueryHandler: GetBoardQueryHandler
  private boardRepository: BoardRepository
  private userRepository: UserRepository

  constructor(
    getBoardQueryHandler: GetBoardQueryHandler,
    boardRepository: BoardRepository,
    userRepository: UserRepository
  ) {
    this.getBoardQueryHandler = getBoardQueryHandler
    this.boardRepository = boardRepository
    this.userRepository = userRepository
  }

  async getBoard(boardId: number): Promise<BoardView> {
    const result = this.getBoardQueryHandler.handle(boardId)

    return result
  }

  async addTaskToBoard(command: AddTaskToBoardCommand): Promise<void> {
    const usecase = new AddTaskToBoardCommandHandler(
      this.boardRepository,
      this.userRepository
    )

    await usecase.handle(command)
  }
}
