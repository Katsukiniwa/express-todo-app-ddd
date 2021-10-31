import { PrismaClient } from '.prisma/client'
import { GetBoardQueryHandler } from '../../usecase/query/GetBoardQueryHandler'
import { BoardView } from '../../usecase/query/view/BoardView'

export class PrismaGetBoardQueryHandler implements GetBoardQueryHandler {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
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
          },
        },
        participants: {
          include: {
            user: true,
          },
        },
      },
    })

    if (prismaBoard == null) {
      throw new Error('user not found')
    }

    const taskList = prismaBoard.tasks.map((e) => ({
      name: e.name,
      assignedUser: {
        id: e.assigned_user.id,
        name: e.assigned_user.name,
        icon: e.assigned_user.icon,
      },
      deadline: e.deadline,
      point: e.point,
    }))

    const activeMemberList = prismaBoard.participants.map((e) => ({
      id: e.id,
      name: e.user.name,
      icon: e.user.icon,
    }))

    /**
     * TODO: ポイントの合計値という重要なロジックはクエリが担って良いのだろうか？(Read Model Updaterの出番)
     */
    const pointSum = taskList.reduce((n, { point }) => n + point, 0)

    return new BoardView({
      id: prismaBoard.id,
      name: prismaBoard.name,
      taskList,
      activeMemberList,
      pointSum,
    })
  }
}
