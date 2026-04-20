"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createInquiryAction(data: {
  message: string;
  propertyId?: string;
  name?: string;
  email?: string;
}) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("auth_session")?.value;
    const rawPropertyId = data.propertyId;
    const propertyId = rawPropertyId && rawPropertyId !== "" ? parseInt(rawPropertyId) : null;
    const userIdNum = userId && userId !== "" ? parseInt(userId) : null;

    console.log('Final Data to Prisma:', {
      message: data.message,
      propertyId,
      userId: userIdNum,
      contactDate: new Date(),
    });

    const inquiry = await prisma.inquiry.create({
      data: {
        message: data.message,
        propertyId: propertyId && !isNaN(propertyId) ? propertyId : null,
        userId: userIdNum && !isNaN(userIdNum) ? userIdNum : null,
        contactDate: new Date(),
      },
    });

    console.log("Inquiry created successfully:", inquiry.id);

    // Revalidate paths to clear cache
    revalidatePath("/test-db");
    revalidatePath("/");
    
    // Also revalidate the specific property page if applicable
    if (data.propertyId) {
      revalidatePath(`/properties/${data.propertyId}`);
    }

    return { success: true, id: inquiry.id };
  } catch (error: any) {
    console.error("Failed to create inquiry:", error);
    return { success: false, error: error.message || "Failed to submit inquiry" };
  }
}
