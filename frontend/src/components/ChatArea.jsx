
import { useState } from "react";
import { useSelector } from "react-redux";

import Nav from "./Nav";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import Artifact from "./Artifact";

function ChatArea({
    messages = [],
    onSendMessage,
    isLoading = false,
    artifact = null,
    onToggleSidebar
}) {

    const [artifactOpen, setArtifactOpen] = useState(false);

    const { selectedConversation } = useSelector(
        state => state.conversation
    );

    const title =
        selectedConversation?.title || "New Chat";

    return (
        <main className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden bg-[#0b0d12] text-slate-100">

            {/* Navigation */}

            <Nav
                title={title}
                onToggleSidebar={onToggleSidebar}
                artifactOpen={artifactOpen}
                onToggleArtifact={() =>
                    setArtifactOpen(prev => !prev)
                }
            />

            <div className="flex min-h-0 flex-1">

                {/* Chat Section */}

                <section className="flex min-w-0 flex-1 flex-col">

                    <MessageList
                        messages={messages}
                        isLoading={isLoading}
                    />

                    <ChatInput
                        onSendMessage={onSendMessage}
                        isLoading={isLoading}
                        disabled={!selectedConversation}
                    />

                </section>

                {/* Artifact Section */}

                {artifactOpen && (
                    <div className="hidden h-full w-[min(42%,520px)] min-w-[300px] lg:block">

                        <Artifact
                            artifact={artifact}
                            onClose={() => setArtifactOpen(false)}
                        />

                    </div>
                )}

            </div>

        </main>
    );
}

export default ChatArea;
