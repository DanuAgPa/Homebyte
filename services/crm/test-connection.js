require('dotenv').config({ path: '../../.env' });
const { PrismaClient } = require('@prisma/client');
const Minio = require('minio');
const fs = require('fs');

const prisma = new PrismaClient();
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT) || 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY || 'admin',
  secretKey: process.env.MINIO_SECRET_KEY || 'password123',
});

async function testConnection() {
  console.log('--- Testing CRM Connections ---');
  try {
    // 1. Test Neon Database
    console.log('1. Connecting to Neon Database...');
    const customers = await prisma.customer.findMany({ take: 1 });
    console.log('✅ Neon Database Connected! Found customers:', customers.length);

    // 2. Test MinIO
    console.log('2. Connecting to MinIO...');
    const bucketName = 'erp-bucket';
    const exists = await minioClient.bucketExists(bucketName).catch(() => false);
    if (!exists) {
      console.log(`Bucket ${bucketName} does not exist, creating it...`);
      await minioClient.makeBucket(bucketName, 'us-east-1');
    }
    
    // Upload a small file
    const fileName = 'crm-test.txt';
    fs.writeFileSync(fileName, 'Hello from CRM Service MinIO test!');
    await minioClient.fPutObject(bucketName, fileName, fileName);
    console.log(`✅ MinIO Connected! File uploaded: ${fileName}`);
    
    // Clean up local file
    fs.unlinkSync(fileName);
    
  } catch (error) {
    console.error('❌ Connection Test Failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
