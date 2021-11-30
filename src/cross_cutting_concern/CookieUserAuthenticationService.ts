import { User } from '../domain/model/user/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserAuthenticationService } from '../domain/service/UserAuthenticationService'
import { PrismaClient } from '.prisma/client'

export class CookieUserAuthenticationService
  implements UserAuthenticationService
{
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async authenticateFrom(email: string, password: string): Promise<User> {
    const prismaUser = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    })

    if (prismaUser == null) {
      throw new Error('user not found')
    }

    const result = bcrypt.compareSync(password, prismaUser.hashed_password)

    if (result) {
      return new User({
        id: prismaUser.id,
        name: prismaUser.name,
        icon: prismaUser.icon,
        email: prismaUser.email,
      })
    } else {
      throw new Error('user not Found')
    }
  }

  encrypt(rawPassword: string): string {
    const hashedPassword = bcrypt.hashSync(rawPassword, 8)

    return hashedPassword
  }
}
