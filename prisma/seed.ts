import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcryptjs.hash('password', 10)
  const bob = await prisma.users.create({
    data: {
      name: 'bob',
      icon: 'https://example.con/bob-icon.png',
      hashed_password: hashedPassword,
      email: 'bob@example.com',
    },
  })
  const sampleBoard = await prisma.boards.create({
    data: {
      name: 'サンプルボード',
      lanes: {
        createMany: {
          data: [
            {
              name: 'todo',
              cover_image: 'https://example.com/boards/1/cover-image-todo.jpeg',
            },
            {
              name: 'doing',
              cover_image:
                'https://example.com/boards/1/cover-image-doing.jpeg',
            },
            {
              name: 'done',
              cover_image: 'https://example.com/boards/1/cover-image-done.jpeg',
            },
          ],
        },
      },
    },
  })
  await prisma.participants.create({
    data: {
      user_id: bob.id,
      board_id: sampleBoard.id,
    },
  })
  const lane = await prisma.lanes.findFirst({
    where: {
      board: sampleBoard,
    },
  })
  if (!lane) {
    throw new Error('fail')
  }
  await prisma.tasks.create({
    data: {
      name: 'Fix CSS bug',
      deadline: new Date(),
      content: 'Please fix CSS layout bug as soon as possible',
      point: 5,
      lane: {
        connect: {
          id: lane.id,
        },
      },
      board: {
        connect: {
          id: sampleBoard.id,
        },
      },
      assigned_user: {
        connect: {
          id: bob.id,
        },
      },
    },
  })
  await prisma.tasks.create({
    data: {
      name: 'create new function',
      deadline: new Date(),
      content: 'user need',
      point: 2,
      lane: {
        connect: {
          id: lane.id,
        },
      },
      board: {
        connect: {
          id: sampleBoard.id,
        },
      },
      assigned_user: {
        connect: {
          id: bob.id,
        },
      },
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('success')
  })
