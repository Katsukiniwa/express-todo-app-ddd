import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const bob = await prisma.users.create({
    data: {
      name: "bob",
      icon: "https://example.con/bob-icon.png",
      hashed_password: "password",
      email: "bob@example.com"
    },
  });
  const sampleBoard = await prisma.boards.create({
    data: {
      name: "サンプル"
    }
  });
  const sampleBoardParticipants = await prisma.participants.create({
    data: {
      user_id: bob.id,
      board_id: sampleBoard.id,
    }
  });
  const sampleTask = await prisma.tasks.create({
    data: {
      name: "Fix CSS bug",
      deadline: new Date(),
      content: "Please fix CSS layout bug as soon as possible",
      point: 5,
      board: {
        connect: {
          id: sampleBoard.id,
        }
      },
      assigned_user: {
        connect: {
          id: bob.id,
        }
      }
    },
  });
  console.log(sampleBoardParticipants);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
