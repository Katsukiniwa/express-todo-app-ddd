import { CommandHandler } from '../../ddd_common/usecase/CommandHandler'
import { BoardRepository } from '../../domain/model/board/BoardRepository'
import { Task } from '../../domain/model/task/Task'
import { AddTaskToLaneCommand } from './AddTaskToLaneCommand'

export class AddTaskToLaneCommandHandler
  implements CommandHandler<AddTaskToLaneCommand>
{
  private boardRepository: BoardRepository

  constructor(boardRepository: BoardRepository) {
    this.boardRepository = boardRepository
  }

  // private async authorize() {

  // }

  async handle(command: AddTaskToLaneCommand) {
    /**
     * TODO: ボードに参加しているかのチェックの処理を実装する
     * 案1: handleメソッド内でボードに参加しているユーザかチェックする
     * 案2: 専用の認可メソッドをユースケースクラス内にメソッドとして切り出す
     * 案3: AOPで認可処理を共通で切り出す
     * 案4: middlewareパターンでコントローラでユースケースが実行される前にチェックする
     */
    const board = await this.boardRepository.findById(command.boardId)

    if (board == null) {
      throw new Error('board not found')
    }

    // const lane = board.findLaneById(command.laneId)
    // const newTask = new Task({ name: command.taskName })
    // lane.addTask(newTask)

    await this.boardRepository.store(board)
  }
}
