import prisma from '../prisma'

async function main() {
  console.log('Cleaning saved_properties table...')
  const deleted = await prisma.savedProperty.deleteMany({})
  console.log(`Successfully deleted ${deleted.count} records from saved_properties.`)
}

main().finally(async () => {
  await prisma.$disconnect()
})
