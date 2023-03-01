import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    sentAt: {
        type: Date,
        default: Date.now
    }
});

const conversationSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            default: () => { return uuidv4() }
        },
        roomName: { type: String },
        participants: [{
            type: mongoose.Schema.ObjectId,
            ref: "User",
        }],
        message: [messageSchema]
    },
    { timestamps: false }, { _id: false }
)

export default mongoose.model('Conversation', conversationSchema);