import prisma from '../prisma'

async function main() {
  const newUrl = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
  
  const updated = await prisma.property.updateMany({
    where: { title: 'Urban Loft Apartment' },
    data: { imageUrl: newUrl }
  })
  
  console.log('Updated:', updated.count, 'properties')
}

main().finally(async () => {
  await prisma.$disconnect()
})
