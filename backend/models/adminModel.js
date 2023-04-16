import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    account: { type: String, required: true },
    password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
