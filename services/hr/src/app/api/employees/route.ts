import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, position, departmentName, salary } = body;

    if (!name || !position || !departmentName) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    // Cari departemen dulu, kalau tidak ada buat baru
    let department = await prisma.department.findUnique({
      where: { name: departmentName }
    });

    if (!department) {
      department = await prisma.department.create({
        data: { name: departmentName }
      });
    }

    // Buat pegawai baru
    const employee = await prisma.employee.create({
      data: {
        name,
        position,
        salary,
        hireDate: new Date(),
        departmentId: department.id
      }
    });

    return NextResponse.json({ success: true, employee });
  } catch (error: any) {
    console.error('Error creating employee:', error);
    return NextResponse.json({ 
      error: 'Gagal menyimpan pegawai',
      details: error.message || String(error)
    }, { status: 500 });
  }
}
