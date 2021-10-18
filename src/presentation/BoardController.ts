import { PrismaGetBoardQueryHandler } from "../infrastructure/query/PrismaGetBoardQueryHandler";
import { BoardView } from "../usecase/query/view/BoardView";

export class BoardController {
  async getBoard(boardId: number): Promise<BoardView> {
    const usecase = new PrismaGetBoardQueryHandler();
    const result = await usecase.handle(boardId);
    return result;
  }
}
