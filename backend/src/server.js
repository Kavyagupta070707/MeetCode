import express from "express";
import {ENV} from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import {serve} from "inngest/express";
import {inngest, functions} from "./lib/inngest.js";
import { clerkMiddleware } from '@clerk/express'
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
const app= express();
const PORT = ENV.PORT

app.use(express.json());
app.use(cors(
    {
        origin: '*'
    }
))

const _dirname = path.resolve();
app.use(clerkMiddleware());
app.use("/api/inngest", serve({client: inngest}, functions)) // deployment ke baad inngest me Apps me frontend ka URL daalna h
app.use("/api/chat", chatRoutes)
app.use("/api/sessions", sessionRoutes)

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server", error);
        process.exit(1);
    }
}

startServer();