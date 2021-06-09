import { Task } from "../../../src/domain/task/Task";
import { TaskRepository } from "../../../src/domain/task/TaskRepository";
import { UserRepository } from "../../../src/domain/user/UserRepository";
import { CommandHandler } from "../../ddd_common/CommandHandler";
import { BoardRepository } from "../../domain/board/BoardRepository";

export interface CreateTaskCommand {
  taskName: string;
  deadline: Date;
  userId: number;
  boardId: number;
}

export class CreateTaskCommandHandler
  implements CommandHandler<CreateTaskCommand>
{
  constructor(
    private boardRepository: BoardRepository,
    private userRepository: UserRepository
  ) {}

  public handle(command: CreateTaskCommand): void {
    const user = this.userRepository.findById(command.userId);
    const board = this.boardRepository.findById(command.boardId);

    if (board == null) {
      throw new Error("ボードが見つかりません");
    }

    board.addTask(command.taskName, user, command.deadline);

    this.boardRepository.store(board);
  }
}
