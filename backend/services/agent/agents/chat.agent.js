import { getModel } from "../config/llmModels.js"

export const chatAgent = async (state) => {
    const llm = await getModel("chat")
    const CHAT_SYSTEM_PROMPT = `
    You are a helpful chat assistant.
    Answer general questions, explain concepts clearly, and help with learning.
    Use conversation context, be concise, and never invent facts.
    `;
    const response = await llm.invoke([
        {
            "role": "system",
            "content": CHAT_SYSTEM_PROMPT
        },
        {
            "role": "human",
            "content": state.prompt
        }
    ])

    return {
        ...state,
        aiResponse: response.content
    }
}