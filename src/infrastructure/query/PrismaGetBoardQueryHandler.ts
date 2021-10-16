import { PrismaClient } from ".prisma/client";
import { Board } from "../../domain/model/board/Board";
import { GetBoardQueryHandler } from "../../usecase/query/GetBoardQueryHandler";
import { BoardView } from "../../usecase/query/view/BoardView";

export class PrismaGetBoardQueryHandler implements GetBoardQueryHandler {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  handle(): BoardView {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new Board();
  }
}
