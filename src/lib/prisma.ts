import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Mengambil URL koneksi dari environment variable (.env)
const connectionString = `${process.env.DATABASE_URL}`;

// Membuat koneksi 'pool' (antrean koneksi) ke PostgreSQL
const pool = new Pool({ connectionString });

// Menghubungkan pool tersebut ke Prisma Adapter
const adapter = new PrismaPg(pool);

// Menyimpan instance Prisma di global object agar tidak terjadi 
// "too many connections" saat Next.js melakukan hot-reload di mode development
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;