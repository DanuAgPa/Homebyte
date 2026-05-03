import prisma from '../prisma'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('Start seeding users...')

  const hashedPassword = await bcrypt.hash('danu123', 10)

  // Seed Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {
      password: hashedPassword,
      name: 'Danu Admin',
      role: 'ADMIN'
    },
    create: {
      name: 'Danu Admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  // Seed User
  const user = await prisma.user.upsert({
    where: { email: 'user@gmail.com' },
    update: {
      password: hashedPassword,
      name: 'Danu User',
      role: 'USER'
    },
    create: {
      name: 'Danu User',
      email: 'user@gmail.com',
      password: hashedPassword,
      role: 'USER',
    },
  })

  console.log(`Admin user created/updated successfully: ${admin.email}`)
  console.log(`Regular user created/updated successfully: ${user.email}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
