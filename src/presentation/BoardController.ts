import { GetBoardQueryHandler } from "../usecase/query/GetBoardQueryHandler";
import { BoardView } from "../usecase/query/view/BoardView";

export class BoardController {
  private getBoardQueryHandler: GetBoardQueryHandler;

  constructor(getBoardQueryHandler: GetBoardQueryHandler) {
    this.getBoardQueryHandler = getBoardQueryHandler;
  }

  async getBoard(boardId: number): Promise<BoardView> {
    const result = this.getBoardQueryHandler.handle(boardId);

    return result;
  }
}
