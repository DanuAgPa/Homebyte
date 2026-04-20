import prisma from '../prisma';

async function updateImage() {
  try {
    const prop = await prisma.property.findFirst({
      where: {
        title: 'Urban Loft Apartment'
      }
    });

    if (prop) {
      await prisma.property.update({
        where: { id: prop.id },
        data: { imageUrl: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=2070&auto=format&fit=crop' }
      });
      console.log('Successfully updated image for Urban Loft Apartment');
    } else {
      console.log('Property not found');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateImage();
