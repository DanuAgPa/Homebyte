'use client';

import { useState } from 'react';

export default function AttendanceButton({ employeeId }: { employeeId: number }) {
  const [loading, setLoading] = useState(false);

  const handleClockIn = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId }),
      });

      if (res.ok) {
        alert('Berhasil Clock In hari ini!');
        window.location.reload();
      } else {
        const data = await res.json();
        alert(`Gagal: ${data.error}`);
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleClockIn}
      disabled={loading}
      className="text-xs bg-emerald-600 text-white px-4 py-1.5 rounded-md hover:bg-emerald-700 transition font-bold shadow-sm"
    >
      {loading ? '...' : 'KONFIRMASI HADIR'}
    </button>
  );
}
