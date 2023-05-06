import bcrypt from "bcryptjs";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import cloudinary from "../utils/cloudinary.js";

import { createToken } from "./../utils/utilAdmin.js";

export const signin = async (req, res) => {
    const admin = await Admin.findOne({ account: req.body.account });
    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
        res.status(200).send({
            _id: admin._id,
            account: admin.account,
            token: createToken(admin),
        });
        return;
    } else {
        res.status(401).send({ message: "Invalid account or password" });
    }
};

export const signup = async (req, res) => {
    const admin = new Admin({
        account: req.body.account,
        password: bcrypt.hashSync(req.body.password),
    });
    await admin.save();
    res.status(200).send({
        _id: admin._id,
        account: admin.account,
        token: createToken(admin),
    });
};

export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            message: "Success",
            users,
        });
    } catch (error) {
        next(error);
    }
};
export const lockUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { isBlocked: req.body.isBlocked },
            { new: true }
        );
        res.status(200).json({
            message: "Success",
            user,
        });
    } catch (error) {
        next(error);
    }
};
export const uploadAvatarDefault = async (req, res, next) => {
    try {
        let type;
        let image, avatarUrl = "";
        if (req.file) {
            type = req.file.mimetype
            image = `data:${type};base64,` + req.file.buffer.toString('base64');
            const uploadedResponse = await cloudinary.uploader.upload(image, {
                public_id: "user_avatar_default",
                upload_preset: 'avatar'
            })
        }

        res.status(200).json({ success: true, message: "Uploaded avatar" })
    } catch (error) {
        next(error);
    }
}