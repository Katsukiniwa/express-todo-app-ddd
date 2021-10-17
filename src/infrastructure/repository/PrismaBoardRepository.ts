import { PrismaClient } from "@prisma/client";
import { Board } from "../../domain/model/board/Board";
import { BoardRepository } from "../../domain/model/board/BoardRepository";
import { Task } from "../../domain/model/task/Task";
import { User } from "../../domain/model/user/User";

export class PrismaBoardRepository implements BoardRepository {
  private prisma: PrismaClient;

  constructor () {
    this.prisma = new PrismaClient;
  }

  async findById(id: number): Promise<Board> {
    const prismaBoard = await this.prisma.boards.findUnique({
      where: {
        id
      },
      include: {
        participants: true,
        tasks: {
          include: {
            assigned_user: true
          }
        }
      }
    });

    return new Board({
      id,
      name: prismaBoard.name,
      activeMemberIdList: prismaBoard.participants.map(e => e.id),
      tasks: prismaBoard.tasks.map(e => {
        const assignedUser = e.assigned_user == null ?
          null :
          new User({
            id: e.assigned_user.id,
            name: e.assigned_user.name,
            icon: e.assigned_user.icon,
            email: e.assigned_user.email
          });
        
          return new Task({
          id: e.id,
          name: e.name,
          assignedUser,
          point: e.point,
          deadline: e.deadline
        });
      })
    });
  }

  async store(board: Board): Promise<void> {
    console.log(board);
  }
}
