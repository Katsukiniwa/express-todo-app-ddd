import { BoardView } from "./view/BoardView";

export interface GetBoardQueryHandler {
  handle(boardId: number): Promise<BoardView>;
}
