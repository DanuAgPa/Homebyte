import prisma from '../prisma'

async function main() {
  console.log('Seeding wishlist...')
  
  // Get an existing user (e.g., admin)
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log('No users found. Please create a user first.');
    return;
  }

  // Get 2 properties
  const properties = await prisma.property.findMany({ take: 2 });
  if (properties.length < 2) {
    console.log('Not enough properties found.');
    return;
  }

  // Clear existing saved properties
  await prisma.savedProperty.deleteMany({});

  // Insert new saved properties
  for (const property of properties) {
    await prisma.savedProperty.create({
      data: {
        userId: user.id,
        propertyId: property.id
      }
    });
    console.log(`Saved property: ${property.title} for user: ${user.email}`);
  }

  console.log('Wishlist seeded successfully.');
}

main().finally(async () => {
  await prisma.$disconnect()
})
