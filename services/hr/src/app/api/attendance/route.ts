import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { employeeId } = body;

    if (!employeeId) {
      return NextResponse.json({ error: 'ID Pegawai tidak ditemukan' }, { status: 400 });
    }

    // Cek apakah sudah absen hari ini
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.attendance.findFirst({
      where: {
        employeeId,
        date: {
          gte: today
        }
      }
    });

    if (existing) {
      return NextResponse.json({ error: 'Sudah melakukan absensi hari ini' }, { status: 400 });
    }

    const attendance = await prisma.attendance.create({
      data: {
        employeeId,
        status: 'PRESENT',
        date: new Date()
      }
    });

    return NextResponse.json({ success: true, attendance });
  } catch (error: any) {
    console.error('Error clocking in:', error);
    return NextResponse.json({ error: 'Gagal memproses absensi' }, { status: 500 });
  }
}
