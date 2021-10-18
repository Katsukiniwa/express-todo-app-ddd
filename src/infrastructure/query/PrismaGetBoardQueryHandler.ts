import { PrismaClient } from ".prisma/client";
import { GetBoardQueryHandler } from "../../usecase/query/GetBoardQueryHandler";
import { BoardView } from "../../usecase/query/view/BoardView";

export class PrismaGetBoardQueryHandler implements GetBoardQueryHandler {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async handle(boardId: number): Promise<BoardView> {
    const prismaBoard = await this.prisma.boards.findUnique({
      where: {
        id: boardId,
      },
      include: {
        tasks: {
          include: {
            assigned_user: true,
          }
        },
        participants: {
          include: {
            user: true,
          }
        }
      }
    });
    return new BoardView({
      id: prismaBoard.id,
      name: prismaBoard.name,
      taskList: [],
      activeMemberList: [],
      pointSum: 0,
    });
  }
}
