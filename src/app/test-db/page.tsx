import prisma from '@/lib/prisma';
import { injectDummyPropertiesAction } from '@/lib/actions/propertyActions';

// Memastikan halaman selalu fetch data terbaru (tidak di-cache)
export const dynamic = 'force-dynamic';

export default async function TestDBPage() {
  let propertyData: any[] = [];
  let inquiryData: any[] = [];
  let userData: any[] = [];
  let error: string | null = null;

  async function handleInject() {
    "use server";
    await injectDummyPropertiesAction();
  }

  try {
    // Mengambil data dari tabel Property, Inquiry, dan User sekaligus
    const [properties, inquiries, users] = await Promise.all([
      prisma.property.findMany({ take: 20 }),
      prisma.inquiry.findMany({ take: 20, include: { property: true, user: true } }),
      prisma.user.findMany({ take: 20 }),
    ]);

    propertyData = properties;
    inquiryData = inquiries;
    userData = users;
  } catch (e: any) {
    console.error('Error fetching data:', e);
    error = e.message || 'Unknown error occurred';
  }

  const renderSection = (title: string, data: any) => (
    <div style={{ marginBottom: '3rem' }}>
      <h2 style={{ 
        color: '#3b82f6', 
        borderBottom: '2px solid #3b82f6', 
        paddingBottom: '0.5rem',
        marginBottom: '1rem',
        fontSize: '1.5rem'
      }}>
        {title}
      </h2>
      <pre style={{ 
        background: '#1e293b', 
        color: '#f8fafc', 
        padding: '1.5rem', 
        borderRadius: '0.75rem', 
        overflowX: 'auto',
        fontSize: '0.85rem',
        lineHeight: '1.5',
        boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
      }}>
        {JSON.stringify(data, null, 2)}
      </pre>
      <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>
        Total Record: {data.length}
      </p>
    </div>
  );

  return (
    <div style={{ 
      padding: '3rem 2rem', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      color: '#0f172a'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <form action={handleInject} style={{ marginBottom: '2rem' }}>
            <button 
              type="submit"
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem',
                boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.4)',
                transition: 'all 0.2s ease',
              }}
            >
              💉 Inject Data Dummy (3 Properti)
            </button>
          </form>

          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>
            Database Inspector
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
            Pemantauan Data Real-time (force-dynamic)
          </p>
        </div>
        
        {error ? (
          <div style={{ 
            padding: '1.5rem', 
            background: '#fee2e2', 
            border: '2px solid #ef4444', 
            borderRadius: '1rem', 
            color: '#b91c1c',
            marginBottom: '2rem'
          }}>
            <h3 style={{ marginTop: 0 }}>❌ Terjadi Kesalahan Koneksi</h3>
            <p>{error}</p>
          </div>
        ) : (
          <div style={{ 
            padding: '1.25rem', 
            background: '#f0fdf4', 
            border: '2px solid #22c55e', 
            borderRadius: '1rem', 
            color: '#15803d',
            marginBottom: '3rem',
            textAlign: 'center',
            fontWeight: '600'
          }}>
            ✅ Database Terhubung & Berhasil Menarik Data
          </div>
        )}

        {renderSection('--- DATA PROPERTI (Property) ---', propertyData)}
        {renderSection('--- DATA PESAN (Inquiry) ---', inquiryData)}
        {renderSection('--- DATA USER (User) ---', userData)}
        
        <footer style={{ marginTop: '4rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
          HomeByte Database Debugger &middot; 2024
        </footer>
      </div>
    </div>
  );
}
