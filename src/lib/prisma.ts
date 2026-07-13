import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dns from 'dns';

const originalLookup = dns.lookup as any;
// @ts-ignore
dns.lookup = function (hostname: any, options: any, callback: any) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  const opts = typeof options === 'number' ? { family: options } : { ...options };
  if (!opts.family) {
    opts.family = 4;
  }
  return originalLookup.call(this, hostname, opts, callback);
};

// Mengambil URL koneksi dari environment variable (.env)
const connectionString = `${process.env.DATABASE_URL}`;

// Membuat koneksi 'pool' (antrean koneksi) ke PostgreSQL dengan dukungan SSL untuk Neon DB
const pool = new Pool({ 
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

// Menghubungkan pool tersebut ke Prisma Adapter
const adapter = new PrismaPg(pool);

// Menyimpan instance Prisma di global object agar tidak terjadi 
// "too many connections" saat Next.js melakukan hot-reload di mode development
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;