import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapterProvider } from "./nuqs-adapter";
import { Analytics } from "@vercel/analytics/next";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NuqsAdapterProvider>
			{children}
			<Toaster richColors />
			<Analytics mode="production" />
		</NuqsAdapterProvider>
	);
}
