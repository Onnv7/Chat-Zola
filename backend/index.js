import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import crypto from "crypto";

import authRoute from "./routes/auth.js";
import conversationRoute from "./routes/conversation.js";
import userRoute from "./routes/user.js";
import todoRoute from "./routes/todo.js";
import reportRoute from "./routes/report.js";
import adminRoute from "./routes/admin.js";
import { authenticateToken } from "./controllers/authController.js";
import cookieParser from 'cookie-parser';
const app = express();
dotenv.config();

const connect = async () => {
    try {
        // "mongodb+srv://lama:<password>@cluster0.1qwmnmy.mongodb.net/test"
        // "mongodb://127.0.0.1:27017/Zola"
        await mongoose.connect("mongodb://127.0.0.1:27017/Zola");
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected!");
});

app.use(cors({ credentials: true, origin: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use("/backend/auth", authRoute);
app.use("/backend/conversation", conversationRoute);
app.use("/backend/user", userRoute);
app.use("/backend/todo", todoRoute);
app.use("/backend/report", reportRoute);
app.use("/backend/admin", adminRoute);
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
app.listen(8800, () => {
    connect();
    console.log("Connected to backend");
});
