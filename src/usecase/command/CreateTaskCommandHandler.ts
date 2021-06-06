import { Task } from "../../../src/domain/task/Task";
import { TaskRepository } from "../../../src/domain/task/TaskRepository";
import { UserRepository } from "../../../src/domain/user/UserRepository";
import { CommandHandler } from "../../ddd_common/CommandHandler";

export interface CreateTaskCommand {
  taskName: string;
  deadline: Date;
  userId: number;
}

export class CreateTaskCommandHandler
  implements CommandHandler<CreateTaskCommand>
{
  constructor(
    private taskRepository: TaskRepository,
    private userRepository: UserRepository
  ) {}

  public handle(command: CreateTaskCommand): void {
    const user = this.userRepository.findById(command.userId);
    const task = new Task(null, command.taskName, user, command.deadline);
    this.taskRepository.store(task);
  }
}
