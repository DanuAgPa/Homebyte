import * as Minio from 'minio';

export const minioClient = new Minio.Client({
  endPoint: 'minio',
  port: 9000,
  useSSL: false,
  accessKey: 'admin',
  secretKey: 'password123',
});

// Bucket sesuai instruksi terbaru
export const BUCKET_NAME = 'homebyte-storage';

export async function initializeBucket() {
  try {
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    if (!exists) {
      await minioClient.makeBucket(BUCKET_NAME, 'us-east-1');
      console.log(`Bucket ${BUCKET_NAME} created successfully.`);
    }
  } catch (error) {
    console.error('Error initializing MinIO bucket:', error);
    throw error;
  }
}
