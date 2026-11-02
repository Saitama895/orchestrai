
import { useState } from "react";

import {
    Check,
    Code2,
    Copy,
    Download,
    FileText,
    X
} from "lucide-react";

function Artifact({ artifact, onClose }) {

    const [copied, setCopied] = useState(false);

    if (!artifact) {
        return (
            <aside className="flex h-full flex-col items-center justify-center border-l border-white/[0.06] bg-[#0d0f14] px-6 text-center">

                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-slate-600">
                    <Code2 size={22} />
                </div>

                <p className="text-sm font-medium text-slate-300">
                    No artifact selected
                </p>

                <p className="mt-1 max-w-[220px] text-xs leading-5 text-slate-600">
                    Generated code and documents will appear here.
                </p>

            </aside>
        );
    }

    const content =
        artifact.content ??
        artifact.code ??
        artifact.text ??
        "";

    const title =
        artifact.title ||
        artifact.name ||
        "Untitled artifact";

    const language =
        artifact.language ||
        artifact.type ||
        "text";

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(String(content));

            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 1500);

        } catch (error) {
            console.error("Unable to copy artifact:", error);
        }
    };

    const handleDownload = () => {

        const blob = new Blob(
            [String(content)],
            { type: "text/plain;charset=utf-8" }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = title.replace(/[^\w.-]+/g, "_");

        link.click();

        URL.revokeObjectURL(url);
    };

    return (
        <aside className="flex h-full min-h-0 flex-col border-l border-white/[0.06] bg-[#0d0f14]">

            {/* Artifact Header */}

            <div className="flex h-[65px] shrink-0 items-center gap-2 border-b border-white/[0.06] px-4">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-300">
                    {language === "text"
                        ? <FileText size={16} />
                        : <Code2 size={16} />
                    }
                </div>

                <div className="min-w-0 flex-1">

                    <p className="truncate text-xs font-medium text-slate-200">
                        {title}
                    </p>

                    <p className="text-[10px] uppercase tracking-wider text-slate-600">
                        {language}
                    </p>

                </div>

                <button
                    onClick={handleCopy}
                    title="Copy artifact"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border-0 bg-transparent text-slate-500 hover:bg-white/[0.05] hover:text-slate-200"
                >
                    {copied
                        ? <Check size={15} />
                        : <Copy size={15} />
                    }
                </button>

                <button
                    onClick={handleDownload}
                    title="Download artifact"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border-0 bg-transparent text-slate-500 hover:bg-white/[0.05] hover:text-slate-200"
                >
                    <Download size={15} />
                </button>

                {onClose && (
                    <button
                        onClick={onClose}
                        title="Close artifact"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border-0 bg-transparent text-slate-500 hover:bg-white/[0.05] hover:text-slate-200"
                    >
                        <X size={15} />
                    </button>
                )}

            </div>

            {/* Artifact Content */}

            <pre className="min-h-0 flex-1 overflow-auto p-4 text-xs leading-6 text-slate-300 [tab-size:2]">
                <code>{String(content)}</code>
            </pre>

        </aside>
    );
}

export default Artifact;
