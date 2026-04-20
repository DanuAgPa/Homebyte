import prisma from "../prisma";
import * as dotenv from "dotenv";

dotenv.config();

async function seed() {
  console.log("🌱 Seeding 10 professional property records...");

  const properties = [
    {
      title: "Villa Kayu Estetik",
      category: "HOUSE",
      city: "Ubud, Bali",
      address: "Jl. Raya Tegallalang",
      price: 4500000000,
      description: "Villa tradisional modern dengan kolam renang pribadi dan pemandangan sawah yang menakjubkan.",
      bedrooms: 3,
      bathrooms: 3,
      areaSquareMeter: 250,
      imageUrl: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1200&q=80",
      isFeatured: true
    },
    {
      title: "Kost Eksklusif Unmer",
      category: "HOUSE",
      city: "Malang",
      address: "Jl. Terusan Dieng",
      price: 2100000000,
      description: "Kost eksklusif dekat kampus Unmer, 15 kamar tidur dengan kamar mandi dalam. ROI sangat tinggi.",
      bedrooms: 15,
      bathrooms: 15,
      areaSquareMeter: 300,
      imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
      isFeatured: false
    },
    {
      title: "The Icon Tower A",
      category: "APARTMENT",
      city: "Kuningan, Jakarta",
      address: "Kawasan Mega Kuningan",
      price: 2800000000,
      description: "Unit studio mewah full furnished di jantung bisnis Jakarta. Fasilitas gym dan kolam renang lengkap.",
      bedrooms: 1,
      bathrooms: 1,
      areaSquareMeter: 45,
      imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      isFeatured: true
    },
    {
      title: "Tanah Kavling Industri",
      category: "LAND",
      city: "Karawang",
      address: "Kawasan Industri KIIC",
      price: 8000000000,
      description: "Lahan 1 hektar dalam kawasan industri strategis, siap untuk pembangunan pabrik atau gudang.",
      bedrooms: 0,
      bathrooms: 0,
      areaSquareMeter: 10000,
      imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      isFeatured: false
    },
    {
      title: "Rumah Modern Tropis",
      category: "HOUSE",
      city: "Surabaya Barat",
      address: "Citraland Cluster Northwest",
      price: 1750000000,
      description: "Rumah desain modern tropis dalam sistem cluster mewah. Keamanan 24 jam dan lingkungan asri.",
      bedrooms: 3,
      bathrooms: 2,
      areaSquareMeter: 120,
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      isFeatured: false
    },
    {
      title: "Penthouse Sudirman",
      category: "APARTMENT",
      city: "Jakarta Pusat",
      address: "Jl. Jenderal Sudirman Kav 21",
      price: 7500000000,
      description: "Lantai paling atas dengan kolam renang rooftop pribadi dan pemandangan 360 derajat kota Jakarta.",
      bedrooms: 4,
      bathrooms: 4,
      areaSquareMeter: 350,
      imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
      isFeatured: true
    },
    {
      title: "Smart Compact House",
      category: "HOUSE",
      city: "BSD City",
      address: "Cluster Tabebuya",
      price: 1200000000,
      description: "Rumah minimalis dengan fitur full smart home, cocok untuk milenial dan keluarga muda.",
      bedrooms: 2,
      bathrooms: 2,
      areaSquareMeter: 72,
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      isFeatured: false
    },
    {
      title: "Lahan Perkebunan Pinus",
      category: "LAND",
      city: "Batu, Malang",
      address: "Kawasan Wisata Songgoriti",
      price: 3500000000,
      description: "Lahan indah dengan pepohonan pinus, sangat cocok untuk area glamping, cafe, atau villa resort.",
      bedrooms: 0,
      bathrooms: 0,
      areaSquareMeter: 5000,
      imageUrl: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
      isFeatured: false
    },
    {
      title: "Urban Loft Apartment",
      category: "APARTMENT",
      city: "Bandung",
      address: "Jl. Cihampelas No. 160",
      price: 950000000,
      description: "Apartemen gaya industrial loft, dekat dengan pusat belanja dan kuliner Bandung.",
      bedrooms: 1,
      bathrooms: 1,
      areaSquareMeter: 38,
      imageUrl: "https://images.unsplash.com/photo-1536376074432-af424424aba2?auto=format&fit=crop&w=1200&q=80",
      isFeatured: false
    },
    {
      title: "Resort Waterfront",
      category: "HOUSE",
      city: "Labuan Bajo",
      address: "Pantai Waecicu",
      price: 12000000000,
      description: "Resort mewah dengan akses langsung ke pantai pribadi di salah satu destinasi wisata terbaik dunia.",
      bedrooms: 5,
      bathrooms: 5,
      areaSquareMeter: 1200,
      imageUrl: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
      isFeatured: true
    }
  ];

  try {
    for (const data of properties) {
      await prisma.property.upsert({
        where: {
          title_address: {
            title: data.title,
            address: data.address
          }
        },
        update: data,
        create: data as any
      });
      console.log(`✅ Upserted: ${data.title}`);
    }
    console.log("✨ Seeding complete! Database is now populated with professional data.");
  } catch (error) {
    console.error("❌ Seeding error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
