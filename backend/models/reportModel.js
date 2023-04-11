import mongoose from "mongoose";

const reportSchema = mongoose.Schema({
    title: {
        type: String,
        default: "Title",
    },
    description: {
        type: String,
    },
    reporter: {
        type: String,
        ref: "User",
    },
    done: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model("Report", reportSchema);
