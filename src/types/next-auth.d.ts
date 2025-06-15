import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      firstName: string;
      lastName: string;
      address: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    firstName: string;
    lastName: string;
    address: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
  }
}