
import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import protect from "./middleware/auth.middleware.js";
import getCurrentUser from "./controllers/user.controller.js"
import { proxyWithHeader } from "./utils/proxyWithHeader.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
    origin: process.env.FRONTEND_URI || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(cookieParser());
app.use("/api/auth", proxy(process.env.AUTH_SERVICE));
app.use("/api/chat", protect, proxyWithHeader(process.env.CHAT_SERVICE))
app.use("/api/agent", protect, proxy(process.env.AGENT_SERVICE))
app.get("/api/me", protect, getCurrentUser)
app.get("/", (req, res) => {
    res.json({ message: "Gateway is running" });
});

// Forward auth requests to the auth service
app.listen(port, () => {
    console.log(`Gateway running on port ${port}`);
    console.log(`Auth service: ${process.env.AUTH_SERVICE}`);
});