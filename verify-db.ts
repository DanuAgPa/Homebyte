import prisma from './src/lib/prisma';
async function run() {
  const count = await prisma.property.count();
  console.log("Total properties in Neon:", count);
}
run();
