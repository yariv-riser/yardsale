import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { sql } from "./lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Check if user exists
          const existingUser = await sql`SELECT * FROM users WHERE email = ${user.email}`;
          
          if (existingUser.length === 0) {
            // First time login - set as 'user' or 'admin' based on some logic. 
            // For now, first user to login with a specific email could be admin, but default to 'user'
            const role = user.email === process.env.ADMIN_EMAIL ? 'admin' : 'user';
            await sql`
              INSERT INTO users (name, email, image, role) 
              VALUES (${user.name}, ${user.email}, ${user.image}, ${role})
            `;
          }
          return true;
        } catch (error) {
          console.error("Error saving user to DB:", error);
          return true; // Still allow sign in even if DB save fails
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        try {
          const dbUser = await sql`SELECT id, role FROM users WHERE email = ${session.user.email}`;
          if (dbUser.length > 0) {
            session.user.id = dbUser[0].id;
            session.user.role = dbUser[0].role;
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
      return session;
    }
  },
  secret: process.env.AUTH_SECRET,
});
