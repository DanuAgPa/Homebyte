import { NextRequest, NextResponse } from 'next/server';
import { minioClient, BUCKET_NAME, initializeBucket } from '@/lib/minio';

export async function POST(req: NextRequest) {
  try {
    await initializeBucket();

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Tidak ada file yang diunggah' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    await minioClient.putObject(BUCKET_NAME, fileName, buffer, file.size, {
      'Content-Type': file.type,
    });

    // Menggunakan localhost agar link yang dihasilkan bisa diakses langsung via browser
    const fileUrl = `http://localhost:9000/${BUCKET_NAME}/${fileName}`;

    return NextResponse.json({ 
      success: true, 
      message: 'File berhasil diunggah',
      fileName,
      fileUrl
    });
  } catch (error: any) {
    // Log detail error sesuai instruksi
    console.error('======= DETAIL ERROR UPLOAD MINIO =======');
    console.error(error);
    console.error('Stack Trace:', error.stack);
    
    return NextResponse.json({ 
      error: 'Gagal mengunggah file',
      details: error.message || String(error)
    }, { status: 500 });
  }
}
