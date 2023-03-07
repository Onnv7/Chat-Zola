import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";



// register a new user
export const register = async (req, res, next) => {

    // TODO: sửa lỗi chỗ ngày sinh trong mongoose khác với date tong js => sử dụng 'yyyy-mm-dd để fix
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);


        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(200).json({ success: true, message: "Success" });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordCorrect)
            throw createError(400, "Wrong password or username!");

        const token = jwt.sign({ id: user._id, email: user.email }, "an");
        const { avatar, password, ...otherDetails } = user._doc;
        console.log(otherDetails)
        res.cookie("access_token", token)
            .status(200)
            .json({ ...otherDetails });
    } catch (err) {
        next(err);
    }
};
