
import {
    Menu,
    PanelRight,
    Sparkles,
    Code2
} from "lucide-react";

function Nav({
    title = "New Chat",
    onToggleSidebar,
    onToggleArtifact,
    artifactOpen = false
}) {
    return (
        <header className="flex h-[65px] shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#0d0f14] px-4 md:px-6">

            <div className="flex min-w-0 items-center gap-3">

                <button
                    onClick={onToggleSidebar}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border-0 bg-transparent text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-slate-100 lg:hidden"
                >
                    <Menu size={18} />
                </button>

                <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-200">
                        {title}
                    </div>

                    <div className="mt-0.5 text-[10px] text-slate-600">
                        <Sparkles
                            size={10}
                            className="mr-1 inline text-indigo-400"
                        />
                        Your AI workspace
                    </div>
                </div>

            </div>

            <button
                onClick={onToggleArtifact}
                aria-pressed={artifactOpen}
                className={`flex h-8 items-center gap-2 rounded-lg border px-3 text-xs transition-colors ${
                    artifactOpen
                        ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-300"
                        : "border-white/[0.08] bg-white/[0.03] text-slate-400 hover:bg-white/[0.07] hover:text-slate-200"
                }`}
            >
                <Code2 size={14} />
                <span className="hidden sm:inline">Artifacts</span>
                <PanelRight size={13} />
            </button>

        </header>
    );
}

export default Nav;
