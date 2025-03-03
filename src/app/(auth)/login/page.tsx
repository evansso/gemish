import type { Metadata } from "next";
import { LogIn } from "./_components/login";

export const metadata: Metadata = {
	title: "Login",
	description: "Login to Gemish",
};

export default function LoginPage() {
	return <LogIn />;
}
