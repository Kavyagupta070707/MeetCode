import express from "express";
import {ENV} from "./lib/env.js";
import { connectDB } from "./lib/db.js";

const app= express();
const PORT = ENV.PORT



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