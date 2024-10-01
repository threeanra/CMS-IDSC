/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          // Call the API for authentication
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: credentials.username,
                password: credentials.password,
              }),
            }
          );

          // Check if the response is okay
          if (!res.ok) {
            throw new Error("Failed to log in");
          }

          const data = await res.json();

          // Check if access_token is returned
          if (data.access_token) {
            const expirationTime = 24 * 60 * 60 * 1000;
            return {
              id: data.data.id,
              username: data.data.username,
              email: data.data.email,
              role: data.data.role,
              token: data.access_token,
              expires: Date.now() + expirationTime,
            };
          }
        } catch (error) {
          console.error("Error during login:", error);
        }

        return null; // Return null if authorization failed
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
        token.token = user.token;
        token.expires = user.expires; // Set token expiration
      }

      // Check if the token has expired
      if (token.expires && Date.now() > new Date(token.expires).getTime()) {
        return { ...token, expired: true }; // Mark the token as expired
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.token = token.token;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
