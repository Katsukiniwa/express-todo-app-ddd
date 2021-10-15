import { UserRepository } from "../../../src/domain/user/UserRepository";
import { CommandHandler } from "../../ddd_common/CommandHandler";
import { BoardRepository } from "../../domain/board/BoardRepository";

export interface CreateTaskCommand {
  taskName: string;
  deadline: Date;
  userId: number;
  boardId: number;
}

/**
 * タスクをボードに作成して追加するユースケース(Trelloのレーンにカードを追加するイメージ)
 */
export class CreateTaskCommandHandler implements CommandHandler<CreateTaskCommand> {
  constructor(
    private boardRepository: BoardRepository,
    private userRepository: UserRepository
  ) {}

  public handle(command: CreateTaskCommand): void {
    const user = this.userRepository.findById(command.userId);

    if (user == null) {
      throw new Error("ユーザが見つかりません");
    }

    const board = this.boardRepository.findById(command.boardId);

    if (board == null) {
      throw new Error("ボードが見つかりません");
    }

    board.addTask(command.taskName, user, command.deadline);

    this.boardRepository.store(board);
  }
}
