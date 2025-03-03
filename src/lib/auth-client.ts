import { createAuthClient } from "better-auth/react";
import { baseURL } from "./auth";

export const authClient = createAuthClient({
	baseURL,
});

export const { signIn, signOut, signUp, useSession } = authClient;
