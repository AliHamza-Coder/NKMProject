import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const db = await getDatabase();
          if (!db) {
            throw new Error("Database connection failed");
          }

          // Find user by email
          const user = await db.collection("users").findOne({ email: credentials.email });
          if (!user) {
            return null;
          }

          // Check if user is active
          if (!user.active) {
            throw new Error("Your account has been deactivated");
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) {
            return null;
          }

          // Update last login time
          const now = new Date();
          await db.collection("users").updateOne(
            { _id: user._id },
            { $set: { lastLogin: now, updatedAt: now } }
          );

          return {
            id: user._id.toString(),
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address || "",
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        // If it's a Google sign-in
        if (account.provider === "google") {
          try {
            const db = await getDatabase();
            if (!db) {
              throw new Error("Database connection failed");
            }

            // Check if user exists
            const existingUser = await db.collection("users").findOne({ email: user.email });
            
            if (existingUser) {
              // Update existing user with Google info
              await db.collection("users").updateOne(
                { _id: existingUser._id },
                { 
                  $set: { 
                    lastLogin: new Date(),
                    updatedAt: new Date(),
                    googleId: account.providerAccountId,
                  } 
                }
              );
              
              // Add user details to token
              token.id = existingUser._id.toString();
              token.firstName = existingUser.firstName;
              token.lastName = existingUser.lastName;
              token.address = existingUser.address || "";
            } else {
              // Create new user from Google account
              const names = user.name?.split(" ") || ["", ""];
              const firstName = names[0] || "";
              const lastName = names.slice(1).join(" ") || "";
              
              const newUser = {
                firstName,
                lastName,
                email: user.email,
                googleId: account.providerAccountId,
                createdAt: new Date(),
                updatedAt: new Date(),
                lastLogin: new Date(),
                active: true,
              };
              
              const result = await db.collection("users").insertOne(newUser);
              
              // Add user details to token
              token.id = result.insertedId.toString();
              token.firstName = firstName;
              token.lastName = lastName;
              token.address = "";
            }
          } catch (error) {
            console.error("Google auth error:", error);
          }
        } else {
          // For credentials login
          token.id = user.id;
          token.firstName = user.firstName;
          token.lastName = user.lastName;
          token.address = user.address;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.address = token.address as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/account",
    signOut: "/account",
    error: "/account",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };