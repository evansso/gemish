"use client";

import { type Message, useChat } from "@ai-sdk/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChatInterface } from "./chat-interface";
import { StartChat } from "./start-chat";
import { useState } from "react";
import { useQueryState } from "nuqs";
import { SearchParams } from "@/config/searchParams";

export function ChatUI() {
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [conversation, setConversation] = useQueryState('conversation', SearchParams.conversation);
	const { input, handleInputChange, handleSubmit, isLoading, messages, stop } =
		useChat({
			id: conversation,
			onError: (error) => {
				toast.error(error.message);
			},
			experimental_prepareRequestBody({ messages, id }) {
				return { messages, id };
			},
		});

	return (
		<div>
			{!hasSubmitted && (
				<StartChat
					onSubmit={handleSubmit}
					input={input}
					handleInputChange={handleInputChange}
					isLoading={isLoading}
					setHasSubmitted={setHasSubmitted}
					stop={stop}
          setConversation={setConversation}
				/>
			)}

      {hasSubmitted && (
        <ChatInterface
        onSubmit={handleSubmit}
				messages={messages}
				input={input}
				handleInputChange={handleInputChange}
				handleSubmit={handleSubmit}
				isLoading={isLoading}
				stop={stop}
			/>
      )}
		</div>
	);
}
