import { Task } from "./Task";

export interface TaskRepository {
  findById(id: number): Task | null;
  store(task: Task): void;
}
