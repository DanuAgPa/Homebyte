"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function toggleWishlistAction(propertyId: number) {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get("auth_session")?.value;
    
    if (!userIdStr) {
      return { success: false, error: "Silakan login terlebih dahulu untuk menyimpan properti." };
    }

    const userId = parseInt(userIdStr);
    
    // Check if already saved
    const existing = await prisma.savedProperty.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId
        }
      }
    });

    if (existing) {
      // Remove it
      await prisma.savedProperty.delete({
        where: { id: existing.id }
      });
      revalidatePath("/saved");
      return { success: true, isSaved: false, message: "Properti dihapus dari Wishlist." };
    } else {
      // Add it
      await prisma.savedProperty.create({
        data: {
          userId,
          propertyId
        }
      });
      revalidatePath("/saved");
      return { success: true, isSaved: true, message: "Properti berhasil ditambahkan ke Wishlist!" };
    }
  } catch (error: any) {
    console.error("Toggle Wishlist Error:", error);
    return { success: false, error: "Terjadi kesalahan sistem." };
  }
}

export async function checkWishlistStatusAction(propertyId: number) {
  try {
    const cookieStore = await cookies();
    const userIdStr = cookieStore.get("auth_session")?.value;
    
    if (!userIdStr) return { isSaved: false };
    
    const existing = await prisma.savedProperty.findUnique({
      where: {
        userId_propertyId: {
          userId: parseInt(userIdStr),
          propertyId
        }
      }
    });

    return { isSaved: !!existing };
  } catch (error) {
    return { isSaved: false };
  }
}
