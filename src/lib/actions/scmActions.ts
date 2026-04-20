"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ShipmentStatus } from "@prisma/client";
import { checkAdmin } from "@/lib/auth-utils";

// --- SUPPLIER ACTIONS ---
export async function getSuppliers() {
  return await prisma.supplier.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export async function createSupplierAction(formData: FormData) {
  try {
    const admin = await checkAdmin();
    if (!admin) return { success: false, error: "Unauthorized" };

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const rating = parseInt(formData.get("rating") as string);

    await prisma.supplier.create({
      data: { name, category, rating }
    });

    revalidatePath("/admin/scm");
    return { success: true };
  } catch (error: any) {
    console.error("Create Supplier Error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateSupplierAction(id: number, formData: FormData) {
  try {
    const admin = await checkAdmin();
    if (!admin) return { success: false, error: "Unauthorized" };

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const rating = parseInt(formData.get("rating") as string);

    await prisma.supplier.update({
      where: { id },
      data: { name, category, rating }
    });

    revalidatePath("/admin/scm");
    return { success: true };
  } catch (error: any) {
    console.error("Update Supplier Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteSupplierAction(id: number) {
  try {
    const admin = await checkAdmin();
    if (!admin) return { success: false, error: "Unauthorized" };

    await prisma.supplier.delete({ where: { id } });
    revalidatePath("/admin/scm");
    return { success: true };
  } catch (error: any) {
    console.error("Delete Supplier Error:", error);
    return { success: false, error: error.message };
  }
}

// --- INVENTORY ACTIONS ---
export async function getInventory() {
  return await prisma.inventory.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export async function createInventoryAction(formData: FormData) {
  try {
    const admin = await checkAdmin();
    if (!admin) return { success: false, error: "Unauthorized" };

    const name = formData.get("name") as string;
    const stock = parseInt(formData.get("stock") as string);
    const reorderPoint = parseInt(formData.get("reorderPoint") as string);

    await prisma.inventory.create({
      data: { name, stock, reorderPoint }
    });

    revalidatePath("/admin/scm");
    return { success: true };
  } catch (error: any) {
    console.error("Create Inventory Error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateInventoryAction(id: number, formData: FormData) {
  try {
    const admin = await checkAdmin();
    if (!admin) return { success: false, error: "Unauthorized" };

    const name = formData.get("name") as string;
    const stock = parseInt(formData.get("stock") as string);
    const reorderPoint = parseInt(formData.get("reorderPoint") as string);

    await prisma.inventory.update({
      where: { id },
      data: { name, stock, reorderPoint }
    });

    revalidatePath("/admin/scm");
    return { success: true };
  } catch (error: any) {
    console.error("Update Inventory Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteInventoryAction(id: number) {
  try {
    const admin = await checkAdmin();
    if (!admin) return { success: false, error: "Unauthorized" };

    await prisma.inventory.delete({ where: { id } });
    revalidatePath("/admin/scm");
    return { success: true };
  } catch (error: any) {
    console.error("Delete Inventory Error:", error);
    return { success: false, error: error.message };
  }
}

// --- SHIPMENT ACTIONS ---
export async function getShipments() {
  return await prisma.shipment.findMany({
    include: { property: true },
    orderBy: { createdAt: "desc" }
  });
}

export async function createShipmentAction(formData: FormData) {
  try {
    const admin = await checkAdmin();
    if (!admin) return { success: false, error: "Unauthorized" };

    const status = formData.get("status") as ShipmentStatus;
    const estimatedDate = new Date(formData.get("estimatedDate") as string);
    const propertyId = parseInt(formData.get("propertyId") as string);

    await prisma.shipment.create({
      data: { status, estimatedDate, propertyId }
    });

    revalidatePath("/admin/scm");
    return { success: true };
  } catch (error: any) {
    console.error("Create Shipment Error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateShipmentAction(id: number, formData: FormData) {
  try {
    const admin = await checkAdmin();
    if (!admin) return { success: false, error: "Unauthorized" };

    const status = formData.get("status") as ShipmentStatus;
    const estimatedDate = new Date(formData.get("estimatedDate") as string);
    const propertyId = parseInt(formData.get("propertyId") as string);

    await prisma.shipment.update({
      where: { id },
      data: { status, estimatedDate, propertyId }
    });

    revalidatePath("/admin/scm");
    return { success: true };
  } catch (error: any) {
    console.error("Update Shipment Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteShipmentAction(id: number) {
  try {
    const admin = await checkAdmin();
    if (!admin) return { success: false, error: "Unauthorized" };

    await prisma.shipment.delete({ where: { id } });
    revalidatePath("/admin/scm");
    return { success: true };
  } catch (error: any) {
    console.error("Delete Shipment Error:", error);
    return { success: false, error: error.message };
  }
}
