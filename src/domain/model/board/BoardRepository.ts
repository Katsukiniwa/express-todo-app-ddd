import { Board } from './Board'

export interface BoardRepository {
  findById(id: number): Promise<Board | null>
  store(board: Board): Promise<void>
}
