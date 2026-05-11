import { prisma } from '@/lib/prisma';
import UploadForm from '@/components/UploadForm';
import CustomerForm from '@/components/CustomerForm';
import LeadAction from '@/components/LeadAction';

export const dynamic = 'force-dynamic';

export default async function CRMDashboard() {
  // Ambil total pelanggan
  const totalCustomers = await prisma.customer.count();
  
  // Ambil total nilai peluang (Opportunity)
  const opps = await prisma.opportunity.aggregate({
    _sum: { amount: true }
  });
  const totalValue = opps._sum.amount || 0;

  // Ambil daftar pelanggan terbaru + data prospeknya
  const customers = await prisma.customer.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      leads: {
        take: 1,
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  return (
    <main className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">CRM Dashboard</h1>
          <p className="text-gray-500 mt-1">Manajemen Pelanggan dan Penjualan HomeByte</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Total Pelanggan</h3>
            <p className="text-4xl font-bold text-blue-600 mt-2">{totalCustomers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Potensi Penjualan</h3>
            <p className="text-4xl font-bold text-emerald-600 mt-2">
              Rp {totalValue.toLocaleString('id-ID')}
            </p>
            <p className="text-xs text-gray-400 mt-1">Dari tabel crm_opportunities</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-center border-l-4 border-l-blue-500">
            <h3 className="text-sm font-medium text-gray-500">Status Database</h3>
            <div className="flex items-center mt-2 space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-lg font-semibold text-gray-800">Neon Cloud Active</span>
            </div>
          </div>
        </div>

        {/* Form Tambah Pelanggan */}
        <CustomerForm />

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Daftar Pelanggan & Prospek</h2>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">10 Terbaru</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200 text-sm font-medium text-gray-500">
                  <th className="px-6 py-3">Nama Pelanggan</th>
                  <th className="px-6 py-3">Alamat</th>
                  <th className="px-6 py-3">Status Prospek</th>
                  <th className="px-6 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      Belum ada data pelanggan.
                    </td>
                  </tr>
                ) : (
                  customers.map((cust) => {
                    const lead = cust.leads[0];
                    return (
                      <tr key={cust.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-800 font-medium">{cust.name}</div>
                          <div className="text-xs text-gray-400">{cust.email}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{cust.address || '-'}</td>
                        <td className="px-6 py-4">
                          {lead ? (
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${
                              lead.status === 'QUALIFIED' ? 'bg-green-50 text-green-700 border-green-200' : 
                              lead.status === 'CONTACTED' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                              'bg-blue-50 text-blue-700 border-blue-200'
                            }`}>
                              {lead.status}
                            </span>
                          ) : (
                            <span className="text-[10px] text-gray-400 italic">Bukan Prospek</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <LeadAction customerId={cust.id} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bagian Bawah: Komponen Upload File */}
        <UploadForm />
      </div>
    </main>
  );
}
