import prisma from '../prisma'

async function main() {
  const props = await prisma.property.findMany()
  console.log(props.map(p => ({ title: p.title, imageUrl: p.imageUrl })))
}

main().finally(async () => {
  await prisma.$disconnect()
})
