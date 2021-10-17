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
  console.log({ bob });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
