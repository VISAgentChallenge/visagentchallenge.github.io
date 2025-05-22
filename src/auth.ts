import "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    accessToken: string;
  }

  export interface Session {
    user: User & DefaultSession["user"];
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    accessToken: string;
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.API_ENDPOINT}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) return null;

          const data = await res.json();
          return {
            id: data.user.id,
            email: data.user.email,
            firstName: data.user.first_name,
            lastName: data.user.last_name,
            createdAt: data.user.created_at,
            accessToken: data.accessToken,
          };
        } catch (error) {
          console.error("Error signing in via Credentials:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          const res = await fetch(`${process.env.API_ENDPOINT}/oauth/user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              first_name: user.name?.split(" ")[0],
              last_name: user.name?.split(" ").slice(1).join(" "),
            }),
          });

          if (!res.ok) return false;
          const data = await res.json();
          user.id = data.user.id;
          user.email = data.user.email;
          user.firstName = data.user.first_name;
          user.lastName = data.user.last_name;
          user.createdAt = data.user.created_at;
          user.accessToken = data.accessToken;
        }
        return true;
      } catch (error) {
        console.error("Error signing in via Google:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.createdAt = user.createdAt;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.createdAt = token.createdAt;
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
