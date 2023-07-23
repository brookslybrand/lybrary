import { prisma } from '~/utils/db.server.ts';

const user = {
  email: 'brookslybrand@gmail.com',
  name: 'Brooks',
};

async function seed() {
  await prisma.user.upsert({
    where: {
      email: user.email,
    },
    update: user,
    create: user,
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
