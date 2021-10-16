import { Board } from "./Board";

export interface BoardRepository {
  findById(id: number): Board | null;
  store(board: Board): void;
}
