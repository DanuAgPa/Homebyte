import * as Minio from 'minio';

// Menggunakan MINIO_ENDPOINT dari environment (untuk Docker isi dengan 'minio'), 
// jika tidak ada akan otomatis menggunakan '127.0.0.1' (saat npm run dev)
const endPoint = process.env.MINIO_ENDPOINT || '127.0.0.1';

export const minioClient = new Minio.Client({
  endPoint: endPoint,
  port: 9000,
  useSSL: false,
  accessKey: 'admin',
  secretKey: 'password123',
});

// Menggunakan bucket homebyte-storage sesuai permintaan terbaru
export const BUCKET_NAME = 'homebyte-storage';

export async function initializeBucket() {
  try {
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    if (!exists) {
      await minioClient.makeBucket(BUCKET_NAME, 'us-east-1');
      console.log(`Bucket ${BUCKET_NAME} created successfully.`);
      
      // Mengatur izin akses publik
      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Action: ['s3:GetObject'],
            Effect: 'Allow',
            Principal: '*',
            Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`],
          },
        ],
      };
      await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
    }
  } catch (error) {
    console.error('Error initializing MinIO bucket:', error);
    // Lempar error ke atas agar API Route bisa menangkapnya
    throw error;
  }
}
