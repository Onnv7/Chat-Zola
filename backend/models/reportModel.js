import mongoose from "mongoose";

const reportSchema = mongoose.Schema({
    title: {
        type: String,
        default: "Title"
    },
    description: {
        type: String,
    },
    reporter: {
        type: mongoose.Types.Schema.ObjectId,
        ref: "User"
    }
})

export default mongoose.Schema("Report", reportSchema);