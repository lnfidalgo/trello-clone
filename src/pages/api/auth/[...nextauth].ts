import { cognitoAuthFunction } from "@/lib/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials-cognito",
      name: "Credenciais Cognito",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const cognitoUser = await cognitoAuthFunction(
          credentials!.email,
          credentials!.password
        );
        if (cognitoUser) {
          return {
            id: cognitoUser.id as string,
            email: cognitoUser.email,
            idToken: cognitoUser.idToken,
            accessToken: cognitoUser.accessToken,
            refreshToken: cognitoUser.refreshToken,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.idToken = user.idToken;
        token.refreshToken = user.refreshToken;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.idToken = token.idToken as string;
      session.refreshToken = token.refreshToken as string;
      session.user = {
        ...session.user,
        email: token.email,
        name: token.name,
      };
      return session;
    },
  },
});
