import type { User } from '@prisma/client'
import { prisma } from '~/utils/db.server.ts'

const user: User = {
  id: 1,
  email: 'brookslybrand@gmail.com',
  name: 'Brooks',
}

async function seed() {
  try {
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    })
  } catch (error) {
    console.log('No users to delete')
  }

  await prisma.user.create({
    data: user,
  })
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
