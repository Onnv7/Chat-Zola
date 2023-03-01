import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
    {
        title: { type: String },
        description: { type: String },
        time: { type: Date }
    },
    { timestamps: true }
)