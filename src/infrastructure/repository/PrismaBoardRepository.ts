import { PrismaClient } from '@prisma/client'
import { Board } from '../../domain/model/board/Board'
import { BoardRepository } from '../../domain/model/board/BoardRepository'
import { Owner } from '../../domain/model/board/Owner'
import { Task } from '../../domain/model/task/Task'
import { User } from '../../domain/model/user/User'

export class PrismaBoardRepository implements BoardRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findById(id: number): Promise<Board> {
    const prismaBoard = await this.prisma.boards.findUnique({
      where: {
        id,
      },
      include: {
        participants: true,
        tasks: {
          include: {
            assigned_user: true,
          },
        },
      },
    })

    if (prismaBoard == null) {
      throw new Error('board not found')
    }

    return new Board({
      id,
      name: prismaBoard.name,
      activeMemberIdList: prismaBoard.participants.map((e) => e.id),
      invitationMemberIdList: [],
      tasks: prismaBoard.tasks.map((e) => {
        const assignedUser =
          e.assigned_user == null
            ? null
            : new User({
                id: e.assigned_user.id,
                name: e.assigned_user.name,
                icon: e.assigned_user.icon,
                email: e.assigned_user.email,
              })

        return new Task({
          id: e.id,
          name: e.name,
          content: e.content,
          assignedUser,
          point: e.point,
          deadline: e.deadline,
        })
      }),
      // TODO: OwnerをDB側で保存できていないので後で実装する
      owner: new Owner({
        id: 1,
        name: 'Tom',
        icon: 'https://example.com',
      }),
    })
  }

  async store(board: Board): Promise<void> {
    if (board.id != null) {
      const prismaBoard = await this.prisma.boards.findUnique({
        where: {
          id: board.id,
        },
      })

      const prismaBoardParticipants = board.activeMemberIdList.map((e) => {
        return {
          where: {
            id: e,
          },
          create: {
            user_id: e,
          },
        }
      })

      const prismaBoardTaskList = board.tasks.map((e) => {
        return {
          where: {
            id: 1,
          },
          create: {
            name: e.name.value,
            content: e.content,
            deadline: e.deadline,
            point: e.point,
          },
        }
      })

      if (prismaBoard == null) {
        await this.prisma.boards.create({
          data: {
            name: board.name.value,
            participants: {
              connectOrCreate: prismaBoardParticipants,
            },
            tasks: {
              connectOrCreate: prismaBoardTaskList,
            },
          },
        })
      } else {
        await this.prisma.boards.update({
          where: {
            id: board.id,
          },
          data: {
            name: board.name.value,
            participants: {
              connectOrCreate: prismaBoardParticipants,
            },
            tasks: {
              connectOrCreate: prismaBoardTaskList,
            },
          },
        })
      }
    }
  }
}
