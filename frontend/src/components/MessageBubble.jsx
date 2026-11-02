
import { useState } from "react";

import {
    Bot,
    Check,
    Copy,
    UserRound
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MessageBubble({ message }) {

    const [copied, setCopied] = useState(false);

    const role = message?.role || message?.sender || "assistant";

    const isUser =
        role === "user" || role === "human";

    const content =
        message?.content ??
        message?.text ??
        message?.message ??
        "";

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(
                typeof content === "string"
                    ? content
                    : JSON.stringify(content)
            );

            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 1500);

        } catch (error) {
            console.error("Unable to copy message:", error);
        }
    };

    return (
        <article
            className={`group flex w-full gap-3 ${
                isUser ? "flex-row-reverse" : "flex-row"
            }`}
        >

            {/* Avatar */}

            <div
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                    isUser
                        ? "bg-violet-500/15 text-violet-300"
                        : "bg-indigo-500/15 text-indigo-300"
                }`}
            >
                {isUser
                    ? <UserRound size={16} />
                    : <Bot size={17} />
                }
            </div>

            {/* Message Content */}

            <div
                className={`flex min-w-0 max-w-[88%] flex-col ${
                    isUser ? "items-end" : "items-start"
                }`}
            >

                <span
                    className={`mb-1 text-[10px] font-medium ${
                        isUser
                            ? "text-violet-300/70"
                            : "text-indigo-300/70"
                    }`}
                >
                    {isUser ? "You" : "CortexAI"}
                </span>

                <div
                    className={`min-w-0 rounded-2xl px-4 py-3 text-[13px] leading-7 ${
                        isUser
                            ? "rounded-tr-md border border-violet-500/15 bg-violet-500/[0.10] text-slate-100"
                            : "rounded-tl-md border border-white/[0.06] bg-[#151821] text-slate-300"
                    }`}
                >

                    <div className="prose prose-invert max-w-none break-words prose-p:my-2 prose-headings:mb-2 prose-headings:mt-4 prose-headings:text-slate-100 prose-a:text-indigo-300 prose-code:rounded prose-code:bg-black/30 prose-code:px-1 prose-code:py-0.5 prose-code:text-indigo-200 prose-pre:overflow-x-auto prose-pre:border prose-pre:border-white/[0.08] prose-pre:bg-[#0b0d12] prose-li:my-0.5">

                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {typeof content === "string"
                                ? content
                                : String(content)
                            }
                        </ReactMarkdown>

                    </div>

                </div>

                {/* Copy Button */}

                {!isUser && (
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="mt-1 flex items-center gap-1 rounded-md border-0 bg-transparent px-1.5 py-1 text-[10px] text-slate-600 opacity-0 transition-opacity hover:text-slate-300 group-hover:opacity-100"
                    >
                        {copied
                            ? <Check size={12} />
                            : <Copy size={12} />
                        }

                        {copied ? "Copied" : "Copy"}
                    </button>
                )}

            </div>

        </article>
    );
}

export default MessageBubble;
