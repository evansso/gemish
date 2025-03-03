import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { ChatUI } from "./_components/chat-ui";

export default function Home() {
	return (
		<div className="w-full min-h-screen">
			<Suspense
				fallback={
					<div className="flex justify-center flex-col mx-auto items-center w-full">
						<Loader2 className="animate-spin" />
					</div>
				}
			>
				<ChatUI />
			</Suspense>
		</div>
	);
}
