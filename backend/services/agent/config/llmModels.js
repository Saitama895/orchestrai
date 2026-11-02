import { ChatGroq } from "@langchain/groq"
import { configDotenv } from "dotenv"

// load environment variables
configDotenv();

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing from environment variables");
}

const groqLow = new ChatGroq({
    model: "openai/gpt-oss-20b",
    apiKey
})

const groqHigh = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey
})

export const getModel=async (agent)=> {
    switch (agent) {
        case "chat":
            return groqLow;
    
        default:
            return groqHigh;
    }
}