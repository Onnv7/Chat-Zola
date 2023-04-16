import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    refreshToken: {
        type: String,
    }
});

export default mongoose.model("Token", tokenSchema);
