const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Memulai pengisian data pelanggan dummy ke database Neon...');
  
  await prisma.customer.createMany({
    data: [
      { name: 'Budi Santoso', email: 'budi@example.com', phone: '081234567890', company: 'PT Maju Jaya' },
      { name: 'Siti Aminah', email: 'siti@example.com', phone: '081298765432', company: 'CV Berkah Abadi' },
      { name: 'Andi Wijaya', email: 'andi@example.com', phone: '081311223344', company: 'Tech Solutions' },
      { name: 'Dewi Lestari', email: 'dewi@example.com', phone: '081555666777', company: 'HomeByte Agent' },
      { name: 'Rudi Hartono', email: 'rudi@example.com', phone: '081999888777', company: 'Startup Indo' },
    ],
    skipDuplicates: true
  });

  console.log('Berhasil! Data pelanggan dummy sudah ditambahkan.');
}

main()
  .catch((e) => {
    console.error('Terjadi kesalahan:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
