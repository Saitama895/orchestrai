
import { useState } from "react";
import {
    ArrowUp,
    Paperclip,
    Square
} from "lucide-react";

function ChatInput({
    onSendMessage,
    isLoading = false,
    disabled = false
}) {

    const [prompt, setPrompt] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedPrompt = prompt.trim();

        if (!trimmedPrompt || isLoading || disabled) return;

        onSendMessage?.(trimmedPrompt);

        setPrompt("");
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    return (
        <div className="mx-auto w-full max-w-4xl px-4 pb-5 pt-3 md:px-6">

            <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/[0.09] bg-[#151821] p-3 shadow-[0_12px_45px_rgba(0,0,0,0.18)] transition-colors focus-within:border-indigo-500/40"
            >

                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={2}
                    disabled={disabled || isLoading}
                    placeholder="Message CortexAI..."
                    className="max-h-40 min-h-[54px] w-full resize-none border-0 bg-transparent px-1 py-1 text-sm leading-6 text-slate-100 outline-none placeholder:text-slate-600 disabled:opacity-50"
                />

                <div className="flex items-center justify-between pt-2">

                    <div className="flex items-center gap-2">

                        <button
                            type="button"
                            disabled
                            title="File upload coming soon"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border-0 bg-transparent text-slate-600"
                        >
                            <Paperclip size={16} />
                        </button>

                        <span className="text-[10px] text-slate-600">
                            Enter to send · Shift + Enter for a new line
                        </span>

                    </div>

                    <button
                        type="submit"
                        disabled={
                            !prompt.trim() ||
                            isLoading ||
                            disabled
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-xl border-0 bg-gradient-to-br from-indigo-500 to-violet-700 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35"
                    >
                        {isLoading
                            ? <Square size={13} />
                            : <ArrowUp size={17} />
                        }
                    </button>

                </div>

            </form>

            <p className="mt-2 text-center text-[10px] text-slate-600">
                CortexAI can make mistakes. Check important information.
            </p>

        </div>
    );
}

export default ChatInput;
