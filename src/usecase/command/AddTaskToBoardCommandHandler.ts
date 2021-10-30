import { UserRepository } from '../../domain/model/user/UserRepository'
import { CommandHandler } from '../../ddd_common/usecase/CommandHandler'
import { BoardRepository } from '../../domain/model/board/BoardRepository'
import { User } from '../../domain/model/user/User'
import { AddTaskToBoardCommand } from './AddTaskToBoardCommand'

/**
 * ボードにタスクを追加するユースケース
 * Trelloでレーンにカードを追加するイメージ
 * CRUD指向だとCreateTaskとかになりがち
 */
export class AddTaskToBoardCommandHandler
  implements CommandHandler<AddTaskToBoardCommand>
{
  constructor(
    private boardRepository: BoardRepository,
    private userRepository: UserRepository
  ) {}

  public async handle(command: AddTaskToBoardCommand): Promise<void> {
    const board = await this.boardRepository.findById(command.boardId)

    if (board == null) {
      throw new Error('ボードが見つかりません')
    }

    let assignedUser: User | null = null

    if (command.userId) {
      assignedUser = await this.userRepository.findById(command.userId)

      /**
       * nullの場合のエラー投げるのはリポジトリ側でやって良い気がする
       * あまりユースケース層(アプリケーション層)でエラーを投げたくない(純粋な業務ロジックの実行に専念させたい)
       */
      if (assignedUser == null) {
        throw new Error('ユーザが見つかりません')
      }
    }

    board.addTask({
      id: null,
      taskName: command.taskName,
      content: command.content,
      assignedUser,
      deadline: command.deadline,
      point: command.point,
    })

    this.boardRepository.store(board)
  }
}
