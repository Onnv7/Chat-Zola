import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    ref: 'User'
  },
  content: String,
  sentAt: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['message', 'image', 'calling'],
    default: 'message'
  },
  seen: {
    type: Boolean,
    default: false,
  }
});

const conversationSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      // required: true,
      default: () => { return uuidv4() }
    },
    participants: [{
      type: String,
      ref: "User",
    }],
    message: [messageSchema],
    status: {
      type: String,
      enum: ['enabled', 'disabled'],
      default: 'enabled'
    }
  },
  { timestamps: false }, { _id: false }
)

export default mongoose.model('Conversation', conversationSchema);