import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerId, status, amount } = body;

    if (!customerId || !status) {
      return NextResponse.json({ error: 'Customer ID dan Status wajib diisi' }, { status: 400 });
    }

    // Gunakan transaction agar jika satu gagal, semua gagal (menjaga integritas data)
    const result = await prisma.$transaction(async (tx) => {
      // 1. Buat Lead
      const lead = await tx.lead.create({
        data: {
          customerId: parseInt(customerId),
          status: status,
          source: 'CRM Dashboard'
        }
      });

      // 2. Jika ada nilai uang (amount), buat Opportunity
      let opportunity = null;
      if (amount && parseFloat(amount) > 0) {
        opportunity = await tx.opportunity.create({
          data: {
            leadId: lead.id,
            amount: parseFloat(amount),
            stage: status === 'QUALIFIED' ? 'NEGOTIATION' : 'PROSPECTING'
          }
        });
      }

      return { lead, opportunity };
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error('Error creating lead/opportunity:', error);
    return NextResponse.json({ 
      error: 'Terjadi kesalahan server saat memproses prospek',
      details: error.message
    }, { status: 500 });
  }
}
