import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export interface PropertyData {
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  category: "HOUSE" | "APARTMENT" | "LAND" | "COMMERCIAL";
  bedrooms: number;
  bathrooms: number;
  areaSquareMeter: number;
  imageUrl: string;
}

export async function searchProperties(formData: FormData) {
  const query = formData.get("query")?.toString() || "";
  const category = formData.get("category")?.toString() || "ALL";

  console.log(`Searching for: ${query} in category: ${category}`);
  // In a real app, this would use Prisma:
  // await prisma.property.findMany({ where: { ... } })

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return dummy result or redirect
  return { success: true, message: `Found results for ${query}` };
}

export async function createPropertyAction(data: PropertyData) {
  try {
    console.log("Backend Action: Creating property:", data.title);

    const property = await prisma.property.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        address: data.address,
        city: data.city,
        category: data.category,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        areaSquareMeter: data.areaSquareMeter,
        imageUrl: data.imageUrl,
      },
    });

    console.log("Property created successfully:", property.id);

    revalidatePath("/test-db");
    revalidatePath("/properties");
    revalidatePath("/");

    return { success: true, id: property.id };
  } catch (error: any) {
    console.error("Failed to create property:", error);
    return { success: false, error: error.message || "Failed to create listing" };
  }
}

export async function toggleSaveProperty(propertyId: string, currentStatus: boolean) {
  console.log(`Toggling save status for property: ${propertyId}. Currently saved: ${currentStatus}`);
  
  // Simulate network
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In real app:
  // if (currentStatus) await prisma.savedProperty.delete(...)
  // else await prisma.savedProperty.create(...)

  revalidatePath("/");
  return { success: true, saved: !currentStatus };
}

export async function injectDummyPropertiesAction() {
  try {
    const properties = [
      {
        title: 'Modern Glass Villa',
        description: 'Living in the future with panoramic views and minimalist design.',
        price: 4500000,
        address: '123 Crystal Canyon',
        city: 'Beverly Hills',
        category: 'HOUSE' as const,
        bedrooms: 5,
        bathrooms: 6,
        areaSquareMeter: 850,
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Luxury Apartment',
        description: 'Premium sky-high living in the heart of the business district.',
        price: 2000000,
        address: 'Sudirman Tower Lt. 45',
        city: 'Jakarta',
        category: 'APARTMENT' as const,
        bedrooms: 3,
        bathrooms: 2,
        areaSquareMeter: 120,
        imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Minimalist House',
        description: 'Simplicity meets comfort in this quiet suburban family home.',
        price: 1500000,
        address: 'Perumahan Asri Blok C',
        city: 'Malang',
        category: 'HOUSE' as const,
        bedrooms: 2,
        bathrooms: 1,
        areaSquareMeter: 90,
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      }
    ];

    for (const prop of properties) {
      await prisma.property.create({ data: prop });
    }

    revalidatePath("/test-db");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to inject dummy data:", error);
    return { success: false, error: error.message };
  }
}
