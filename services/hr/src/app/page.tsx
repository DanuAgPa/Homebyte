import { prisma } from '@/lib/prisma';
import UploadForm from '@/components/UploadForm';
import EmployeeForm from '@/components/EmployeeForm';
import AttendanceButton from '@/components/AttendanceButton';

export const dynamic = 'force-dynamic';

export default async function HRDashboard() {
  const totalEmployees = await prisma.employee.count();
  
  const employees = await prisma.employee.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: { 
      department: true,
      attendances: {
        where: {
          date: { gte: new Date(new Date().setHours(0,0,0,0)) }
        }
      }
    }
  });

  return (
    <main className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">HR Dashboard</h1>
          <p className="text-slate-500 mt-1">Sistem Informasi Pegawai HomeByte</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500">Total Pegawai Aktif</h3>
            <p className="text-4xl font-bold text-rose-600 mt-2">{totalEmployees}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col justify-center">
            <h3 className="text-sm font-medium text-slate-500">Status Server</h3>
            <div className="flex items-center mt-2 space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-lg font-semibold text-slate-800">Sistem Online & Stabil</span>
            </div>
          </div>
        </div>

        {/* Employee Form Component */}
        <EmployeeForm />

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-800">Daftar Pegawai & Absensi Hari Ini</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-slate-200 text-sm font-medium text-slate-500">
                  <th className="px-6 py-3">Nama Pegawai</th>
                  <th className="px-6 py-3">Jabatan</th>
                  <th className="px-6 py-3">Departemen</th>
                  <th className="px-6 py-3">Status Absen</th>
                  <th className="px-6 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      Belum ada data pegawai. Silakan isi form di atas.
                    </td>
                  </tr>
                ) : (
                  employees.map((emp) => {
                    const hasClockedIn = emp.attendances.length > 0;
                    return (
                      <tr key={emp.id} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4 text-sm text-slate-800 font-bold">{emp.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{emp.position}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          <span className="bg-slate-100 px-2 py-1 rounded-md text-xs font-medium border border-slate-200">{emp.department.name}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {hasClockedIn ? (
                            <span className="text-emerald-600 font-bold text-xs bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">✅ Sudah Hadir</span>
                          ) : (
                            <span className="text-rose-500 font-bold text-xs bg-rose-50 px-3 py-1 rounded-full border border-rose-100 font-mono">Belum Absen</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-right">
                          {!hasClockedIn && <AttendanceButton employeeId={emp.id} />}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upload Form Component */}
        <UploadForm />

      </div>
    </main>
  );
}
