
import { useEffect, useRef } from "react";

import {
    Bot,
    Sparkles
} from "lucide-react";

import MessageBubble from "./MessageBubble";

function MessageList({
    messages = [],
    isLoading = false
}) {

    const bottomRef = useRef(null);

    // Automatically scroll to latest message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    }, [messages, isLoading]);

    // Empty Chat UI
    if (messages.length === 0 && !isLoading) {
        return (
            <section className="flex flex-1 items-center justify-center px-5">

                <div className="max-w-lg text-center">

                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-300">
                        <Bot size={26} />
                    </div>

                    <h1 className="text-xl font-semibold tracking-tight text-slate-100 md:text-2xl">
                        What can I help you with?
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Ask a question, explore an idea, or start building something.
                    </p>

                    <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[10px] text-slate-500">
                        <Sparkles size={11} className="text-indigo-400" />
                        Powered by CortexAI
                    </div>

                </div>

            </section>
        );
    }

    return (
        <section className="flex-1 overflow-y-auto px-4 py-6 md:px-6">

            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">

                {messages.map((message, index) => (
                    <MessageBubble
                        key={
                            message?._id ||
                            message?.id ||
                            `${message?.role || "message"}-${index}`
                        }
                        message={message}
                    />
                ))}

                {/* AI Loading Animation */}

                {isLoading && (
                    <div className="flex items-center gap-3">

                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                            <Bot size={17} />
                        </div>

                        <div className="flex items-center gap-1 rounded-2xl border border-white/[0.06] bg-[#151821] px-4 py-3">

                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.2s]" />

                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.1s]" />

                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400" />

                        </div>

                    </div>
                )}

                <div ref={bottomRef} />

            </div>

        </section>
    );
}

export default MessageList;
