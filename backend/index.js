import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import crypto from "crypto";

import authRoute from "./routes/auth.js";
import conversationRoute from "./routes/conversation.js";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Zola");
        console.log("Connected to mongoDB.");
    }
    catch (error) {
        throw error;
    }
}
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected!");
});

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(500).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.use("/backend/auth", authRoute);
app.use("/backend/conversation", conversationRoute);

app.listen(8800, () => {
    connect();
    console.log("Connected to backend");
});
