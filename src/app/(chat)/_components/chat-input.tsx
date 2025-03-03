'use client'

import { ArrowUp, Square } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useEffect } from "react";

type ChatInputProps = {
	input: string;
	handleInputChange: (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>,
	) => void;
	isLoading: boolean;
	submitChat: (e: React.FormEvent) => void;
	stop: () => void;
};

export function ChatInput({
	input,
	handleInputChange,
	isLoading,
	submitChat,
	stop,
}: ChatInputProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// Auto-resize textarea based on content
	useEffect(() => {
		const textarea = textareaRef.current;
		if (textarea) {
			// Reset height to auto to calculate the scrollHeight correctly
			textarea.style.height = "0px";
			// Set height based on scrollHeight with a minimum of 40px
			const newHeight = Math.max(40, textarea.scrollHeight);
			textarea.style.height = `${newHeight}px`;
		}
	}, []);

	const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			submitChat(e);
		}
	};

	return (
		<div className="flex gap-2 w-full px-2 py-3 border-2 border-grey-100 bg-secondary rounded-3xl h-fit">
			<form onSubmit={submitChat} className="w-full flex flex-col gap-2">
				<div className="relative w-full">
					<Textarea
						ref={textareaRef}
						className="w-full resize-none min-h-[40px] max-h-[200px] overflow-y-auto border-none bg-transparent outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
						value={input}
						onChange={handleInputChange}
						placeholder="Type your message..."
						disabled={isLoading}
						onKeyDown={onKeyDown}
						rows={1}
						autoFocus
						style={{ boxShadow: 'none' }}
					/>
				</div>
				<div className="flex flex-row justify-end items-center h-full">
					{isLoading ? (
						<Button
							className="rounded-full"
							onClick={(event) => {
								event.preventDefault();
								stop();
							}}
							size={'icon'}
						>
							<Square size={14} weight="fill" fill="#ffff" />
						</Button>
					) : (
						<Button
							className="rounded-full"
							disabled={input.length === 0}
							size={'icon'}
							type="submit"
						>
							<ArrowUp size={14} weight="bold" />
						</Button>
					)}
				</div>
			</form>
		</div>
	);
}