import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
    {
        user: {
            type: String,
            ref: "User",
        },
        title: { type: String },
        description: { type: String },
        time: { type: Date },
    },
    { timestamps: true }
);
export default mongoose.model("Todo", todoSchema);
