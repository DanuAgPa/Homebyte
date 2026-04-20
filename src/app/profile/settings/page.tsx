import React from "react";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/ProfileForm";

export default async function ProfileSettingsPage() {
  const cookieStore = await cookies();
  const userIdStr = cookieStore.get("auth_session")?.value;

  if (!userIdStr) {
    redirect("/login");
  }

  const userId = parseInt(userIdStr);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      phone: true,
      bio: true
    }
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-2">Pengaturan Profil</h1>
            <p className="text-foreground/60">Kelola informasi pribadi dan pengaturan akun Anda.</p>
          </div>
        </div>

        <ProfileForm initialData={user} />
      </div>
    </div>
  );
}
