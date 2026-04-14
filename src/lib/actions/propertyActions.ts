"use server";

import { revalidatePath } from "next/cache";

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
