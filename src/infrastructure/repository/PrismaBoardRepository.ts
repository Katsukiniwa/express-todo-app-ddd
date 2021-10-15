import { PrismaClient } from "@prisma/client";
import { Board } from "../../domain/board/Board";
import { BoardRepository } from "../../domain/board/BoardRepository";

export class PrismaBoardRepository implements BoardRepository {
  private prisma: PrismaClient;

  constructor () {
    this.prisma = new PrismaClient;
  }

  findById(id: number): Board {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new Board(id);
  }

  store(board: Board): void {
    console.log(board);
  }
}
