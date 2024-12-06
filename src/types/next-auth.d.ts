/* eslint-disable @typescript-eslint/no-unused-vars */
import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
    refreshToken?: string;
  }
  interface User {
    accessToken?: string;
    idToken?: string;
    refreshToken?: string;
  }
}
