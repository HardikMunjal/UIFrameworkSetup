// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: 1, name: "User", email: "user@example.com" };
        if (credentials.username === "user" && credentials.password === "password") {
          return user;
        }
        return null;
      },
    }),
  ],
};

export async function GET(request) {
  return NextAuth(authOptions)(request);
}

export async function POST(request) {
  return NextAuth(authOptions)(request);
}
