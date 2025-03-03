"use client";

import { ChatInput } from "./chat-input";
import type { Options } from "nuqs";
import { generateId } from "ai";

export function StartChat({
	onSubmit,
	input,
	handleInputChange,
	isLoading,
	setHasSubmitted,
  setConversation,
	stop,
}: {
	onSubmit: (e: React.FormEvent) => void;
	input: string;
	handleInputChange: (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>,
	) => void;
	isLoading: boolean;
	setHasSubmitted: (hasSubmitted: boolean) => void;
	setConversation: (
		value: string | ((old: string | null) => string | null) | null,
		options?: Options,
	) => Promise<URLSearchParams>;
	stop: () => void;
}) {
  const id = generateId()
  
	const submitChat = (e: React.FormEvent) => {
		e.preventDefault();
		setHasSubmitted(true);
    setConversation(id)
		onSubmit(e);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
			<div className="w-full max-w-2xl text-center space-y-8">
				<div className="space-y-4">
					<h1 className="text-4xl font-bold tracking-tight">
						Gemish
					</h1>
				</div>
				<ChatInput
					stop={stop}
					handleInputChange={handleInputChange}
					submitChat={submitChat}
					input={input}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}
