import { PrismaGetBoardQueryHandler } from "../infrastructure/query/PrismaGetBoardQueryHandler";
import { BoardView } from "../usecase/query/view/BoardView";

export class BoardController {
  getBoard(): BoardView {
    const usecase = new PrismaGetBoardQueryHandler();
    const result = usecase.handle();
    return result;
  }
}
