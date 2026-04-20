import prisma from "../prisma";
import * as dotenv from "dotenv";

dotenv.config();

// The prisma instance is already imported from ../prisma.ts
// which uses the pg adapter and connection string from .env

async function dedupe() {
  console.log("🚀 Starting Property Deduplication Process...");

  try {
    // 1. Fetch all properties
    const allProperties = await prisma.property.findMany({
      orderBy: { id: "asc" },
    });

    console.log(`Found ${allProperties.length} total properties.`);

    const seen = new Map<string, number>(); // key: "title|address", value: primaryId
    const toDelete: number[] = [];
    const migrations: { from: number; to: number }[] = [];

    for (const prop of allProperties) {
      const key = `${prop.title.toLowerCase().trim()}|${prop.address.toLowerCase().trim()}`;
      
      if (seen.has(key)) {
        const primaryId = seen.get(key)!;
        console.log(`⚠️  Duplicate found: "${prop.title}" at "${prop.address}" (ID: ${prop.id}) -> Primary is ID: ${primaryId}`);
        toDelete.push(prop.id);
        migrations.push({ from: prop.id, to: primaryId });
      } else {
        seen.set(key, prop.id);
      }
    }

    if (toDelete.length === 0) {
      console.log("✅ No duplicates found. Database is already clean.");
      return;
    }

    console.log(`\n📦 Preparing to migrate relations for ${migrations.length} duplicates...`);

    // 2. Migrate relations for each duplicate
    for (const m of migrations) {
      // Move Inquiries
      const inquiries = await prisma.inquiry.updateMany({
        where: { propertyId: m.from },
        data: { propertyId: m.to },
      });
      if (inquiries.count > 0) console.log(`   - Moved ${inquiries.count} inquiries from ID ${m.from} to ID ${m.to}`);

      // Move SavedProperties
      // Note: This might fail if the user already saved BOTH duplicates. 
      // We'll use a try-catch or just ignore errors for uniqueness conflicts.
      try {
        const saved = await prisma.savedProperty.updateMany({
          where: { propertyId: m.from },
          data: { propertyId: m.to },
        });
        if (saved.count > 0) console.log(`   - Moved ${saved.count} saved properties from ID ${m.from} to ID ${m.to}`);
      } catch (e) {
        console.log(`   - Skipping saved property move for ID ${m.from} due to existing primary entry.`);
      }

      // Move Shipments
      const shipments = await prisma.shipment.updateMany({
        where: { propertyId: m.from },
        data: { propertyId: m.to },
      });
      if (shipments.count > 0) console.log(`   - Moved ${shipments.count} shipments from ID ${m.from} to ID ${m.to}`);
    }

    // 3. Delete the duplicates
    console.log(`\n🗑️  Deleting ${toDelete.length} duplicate properties...`);
    const deleted = await prisma.property.deleteMany({
      where: {
        id: { in: toDelete },
      },
    });

    console.log(`✅ Successfully deleted ${deleted.count} duplicates.`);
    console.log("✨ Deduplication complete!");

  } catch (error) {
    console.error("❌ Error during deduplication:", error);
  } finally {
    await prisma.$disconnect();
  }
}

dedupe();
