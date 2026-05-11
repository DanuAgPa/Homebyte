import * as Minio from 'minio';

const endPoint = process.env.MINIO_ENDPOINT || '127.0.0.1';

export const minioClient = new Minio.Client({
  endPoint: endPoint,
  port: 9000,
  useSSL: false,
  accessKey: 'admin',
  secretKey: 'password123',
});

// Bucket khusus dokumen HR (privat)
export const BUCKET_NAME = 'hr-documents-rahasia';

export async function initializeBucket() {
  try {
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    if (!exists) {
      await minioClient.makeBucket(BUCKET_NAME, 'us-east-1');
      console.log(`Bucket ${BUCKET_NAME} created successfully.`);
      
      // Catatan: Tidak seperti CRM, HR document tidak diberi akses publik.
      // Dokumen hanya bisa diakses via aplikasi atau presigned URL jika diperlukan.
    }
  } catch (error) {
    console.error('Error initializing MinIO bucket:', error);
    throw error;
  }
}
