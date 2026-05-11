const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tables = [
    'attendances',
    'customers',
    'departments',
    'employees',
    'leads',
    'opportunities'
  ];

  console.log('Mulai menghapus tabel duplikat di public schema...');

  for (const table of tables) {
    try {
      // Kita gunakan raw query untuk drop tabel di public secara paksa
      await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "public"."${table}" CASCADE;`);
      console.log(`Tabel "public"."${table}" berhasil dihapus.`);
    } catch (e) {
      console.error(`Gagal menghapus ${table}:`, e.message);
    }
  }

  console.log('Pembersihan selesai! 🧹');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
