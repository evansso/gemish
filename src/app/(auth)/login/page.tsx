import { LogIn } from "./_components/login";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
	description: "Login to MpesaFlow",
};

export default function LoginPage() {
	return <LogIn />;
}
