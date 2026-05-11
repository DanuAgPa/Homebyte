import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, address } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Nama dan Email wajib diisi' }, { status: 400 });
    }

    // Cek apakah email sudah terdaftar
    const existingCustomer = await prisma.customer.findUnique({
      where: { email }
    });

    if (existingCustomer) {
      return NextResponse.json({ error: 'Email sudah terdaftar di sistem' }, { status: 400 });
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone: phone || null,
        address: address || null,
      }
    });

    return NextResponse.json({ success: true, customer });
  } catch (error: any) {
    console.error('Error creating customer:', error);
    return NextResponse.json({ 
      error: 'Terjadi kesalahan pada server saat menyimpan data',
      details: error.message || String(error)
    }, { status: 500 });
  }
}
