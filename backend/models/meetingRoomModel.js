import mongoose from "mongoose";

const meetingRoomSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: () => { return uuidv4() }
    },
    roomMaster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: false });

export default mongoose.Schema("MeetingRoom", meetingRoomSchema)