const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.customer.deleteMany({}).then(() => {
  console.log('Dummy data deleted.');
}).finally(() => {
  prisma.$disconnect();
});
