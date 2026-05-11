'use client';

import { useState } from 'react';

interface LeadActionProps {
  customerId: number;
}

export default function LeadAction({ customerId }: LeadActionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('NEW');
  const [amount, setAmount] = useState('');

  const handleConvert = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, status, amount }),
      });

      if (res.ok) {
        setIsOpen(false);
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

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 hover:bg-blue-100 transition font-bold"
      >
        + JADIKAN PROSPEK
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded border border-gray-200 min-w-[150px]">
      <select 
        value={status} 
        onChange={(e) => setStatus(e.target.value)}
        className="text-xs border rounded p-1"
      >
        <option value="NEW">Baru</option>
        <option value="CONTACTED">Dihubungi</option>
        <option value="QUALIFIED">Tertarik</option>
      </select>
      
      <input 
        type="number" 
        placeholder="Nilai Peluang (Rp)" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="text-xs border rounded p-1"
      />
      
      <div className="flex gap-1">
        <button 
          onClick={handleConvert}
          disabled={loading}
          className="flex-1 bg-blue-600 text-white text-[10px] py-1 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? '...' : 'SIMPAN'}
        </button>
        <button 
          onClick={() => setIsOpen(false)}
          className="bg-gray-300 text-gray-700 text-[10px] px-2 py-1 rounded hover:bg-gray-400"
        >
          X
        </button>
      </div>
    </div>
  );
}
