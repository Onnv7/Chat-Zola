import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        default: "Title"
    },
    content: {
        type: String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

export default mongoose.Schema("Note", noteSchema);