'use client';

import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setStatus('Mengunggah...');
    setFileUrl('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setStatus(`Berhasil Unggah: ${data.fileName}`);
        setFileUrl(data.fileUrl);
        setFile(null);
      } else {
        setStatus(`Gagal: ${data.error}`);
        alert(`Error dari Server: ${data.details || data.error}`);
      }
    } catch (err: any) {
      setStatus('Terjadi kesalahan koneksi saat mengunggah');
      alert(`Koneksi Error: ${err.message || String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Unggah Dokumen Rahasia (KTP/CV)</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 transition"
          />
        </div>
        <button
          type="submit"
          disabled={!file || loading}
          className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 disabled:opacity-50 transition"
        >
          {loading ? 'Memproses...' : 'Upload Dokumen'}
        </button>
        {status && (
          <p className={`text-sm mt-2 font-medium ${status.startsWith('Berhasil') ? 'text-green-600' : 'text-red-600'}`}>
            {status}
          </p>
        )}
        {fileUrl && (
          <p className="text-sm mt-1 text-gray-500 italic">
            File tersimpan di sistem.
          </p>
        )}
      </form>
    </div>
  );
}
