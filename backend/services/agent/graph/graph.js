import { END, START, StateGraph } from "@langchain/langgraph";
import { AgentState } from "./state.js";
import { router } from "./router.js";
import { chatAgent } from "../agents/chat.agent.js";
import { searchAgent } from "../agents/search.agent.js";
import { codingAgent } from "../agents/coding.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { imageAgent } from "../agents/image.agent.js";

const workflow = new StateGraph(AgentState)

workflow.addNode("router", router)
workflow.addNode("chat", chatAgent)
workflow.addNode("search", searchAgent)
workflow.addNode("coding", codingAgent)
workflow.addNode("pdf", pdfAgent)
workflow.addNode("ppt", pptAgent)
workflow.addNode("image", imageAgent)

workflow.addEdge(START, "router")
workflow.addConditionalEdges(
    "router",
    (state)=> 
        ["chat", "search", "coding", "pdf", "ppt", "image"]
            .includes(state.agent)
            ? state.agent
            : "chat",
    {
        chat: "chat",
        search: "search",
        coding: "coding",
        pdf: "pdf",
        ppt: "ppt",
        image: "image"
    }
)
workflow.addEdge("search", "chat")
workflow.addEdge("chat", END)
workflow.addEdge("coding", END)
workflow.addEdge("pdf", END)
workflow.addEdge("ppt", END)
workflow.addEdge("image", END)

export const graph = workflow.compile()