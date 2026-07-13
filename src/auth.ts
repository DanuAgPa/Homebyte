import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const email = user.email;
        const name = user.name;
        if (!email) {
          return false;
        }

        try {
          let dbUser = await prisma.user.findUnique({
            where: { email },
          });

          if (!dbUser) {
            // Determine default role based on email context
            const role = (email.toLowerCase().includes("admin") || email.toLowerCase().includes("sisteminte")) ? "ADMIN" : "USER";
            
            dbUser = await prisma.user.create({
              data: {
                name: name || "Google User",
                email: email,
                password: "", // secure empty password for OAuth users
                role: role as any,
                phone: "",
                bio: "",
              },
            });
          }

          // Set custom cookies for compatibility with current auth check
          const cookieStore = await cookies();
          cookieStore.set("auth_session", dbUser.id.toString(), { path: "/", maxAge: 86400 });
          cookieStore.set("user_role", dbUser.role, { path: "/", maxAge: 86400 });
          cookieStore.set("user_name", dbUser.name, { path: "/", maxAge: 86400 });
          
          return true;
        } catch (error) {
          console.error("Error during Google Sign In callback:", error);
          return false;
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
