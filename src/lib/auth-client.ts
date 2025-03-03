import { createAuthClient } from "better-auth/react";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://gemish.vercel.app";

export const authClient = createAuthClient({
  baseURL,
});

export const { signIn, signOut, signUp, useSession } = authClient;
