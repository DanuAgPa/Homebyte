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
    const fileName = `HR-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    await minioClient.putObject(BUCKET_NAME, fileName, buffer, file.size, {
      'Content-Type': file.type,
    });

    const fileUrl = `http://localhost:9000/${BUCKET_NAME}/${fileName}`;

    return NextResponse.json({ 
      success: true, 
      message: 'Dokumen HR berhasil diunggah',
      fileName,
      fileUrl
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ 
      error: 'Gagal mengunggah dokumen HR',
      details: error.message || String(error)
    }, { status: 500 });
  }
}
