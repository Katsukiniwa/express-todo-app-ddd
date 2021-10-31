import { PrismaClient } from '@prisma/client'
import { User } from '../../domain/model/user/User'
import { UserRepository } from '../../domain/model/user/UserRepository'

export class PrismaUserRepository implements UserRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findById(userId: number): Promise<User> {
    const prismaUser = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    })

    if (prismaUser == null) {
      throw new Error('user not found')
    }

    return new User({
      id: prismaUser.id,
      name: prismaUser.name,
      icon: prismaUser.icon,
      email: prismaUser.email,
    })
  }

  async store(user: User): Promise<void> {
    console.log(user)
  }
}
