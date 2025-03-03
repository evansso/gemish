"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import { ChatInput } from "./chat-input";
import { ChatMarkdown } from "./chat-markdown";

export function ChatInterface({
	messages,
	input,
	handleInputChange,
	handleSubmit,
	isLoading,
	stop,
	onSubmit,
}: {
	messages: Message[];
	input: string;
	handleInputChange: (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>,
	) => void;
	handleSubmit: (e: React.FormEvent) => void;
	isLoading: boolean;
	stop: () => void;
	onSubmit: (e: React.FormEvent) => void;
}) {
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const scrollAreaRef = useRef<HTMLDivElement>(null);

	const submitChat = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(e);
	};

	// Auto-scroll to bottom when messages change or when loading state changes
	useEffect(() => {
		scrollToBottom();
	}, [messages, isLoading]);

	const scrollToBottom = () => {
		// Method 1: Using scrollIntoView if messagesEndRef is accessible
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

		// Method 2: Using the ScrollArea's DOM element if method 1 doesn't work
		if (scrollAreaRef.current) {
			const scrollableElement = scrollAreaRef.current.querySelector(
				"[data-radix-scroll-area-viewport]",
			);
			if (scrollableElement) {
				scrollableElement.scrollTop = scrollableElement.scrollHeight;
			}
		}
	};

	return (
		<div className="flex flex-col h-screen bg-background">
			<ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
				<div className="max-w-3xl mx-auto w-full space-y-5">
					{messages.map((message, index) => (
						<div
							key={`${message.id}-${index}`}
							className={`flex  ${
								message.role === "user" ? "justify-end" : "justify-start"
							}`}
						>
							{message.role === "user" ? (
								<div className="rounded-3xl bg-primary/10 max-w-[60%] px-5 py-2">
									{message.content}
								</div>
							) : (
								<div className="w-full flex">
									<div className="w-full">
										<ChatMarkdown key={message.id} content={message.content} />
									</div>
								</div>
							)}
						</div>
					))}
					{isLoading && (
						<div className="flex justify-start">
							<div className="rounded-lg px-6 py-3 max-w-[80%] bg-muted">
								<span className="animate-pulse">thinking...</span>
							</div>
						</div>
					)}
					{/* Invisible element to scroll to */}
					<div ref={messagesEndRef} />
				</div>
			</ScrollArea>
			<div className="sticky bottom-0 inset-0">
				<div className="bg-background w-full py-3 mx-auto max-w-3xl">
					<ChatInput
						stop={stop}
						handleInputChange={handleInputChange}
						submitChat={submitChat}
						input={input}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</div>
	);
}
