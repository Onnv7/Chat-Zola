import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail.js';

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
        res.status(200).json({ success: true, message: 'Success' });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) return next(createError(404, 'User not found!'));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordCorrect) throw createError(400, 'Wrong password or username!');

        const token = jwt.sign({ id: user._id, email: user.email }, 'an');
        const { password, friendsList, friendRequest, invitationSent, ...otherDetails } = user._doc;

        res.cookie('access_token', token)
            .status(200)
            .json({ ...otherDetails });
    } catch (err) {
        next(err);
    }
};

export const changePassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        // console.log(req.body, req.params.userId)
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        // console.log(isPasswordCorrect)
        if (!isPasswordCorrect) return res.status(200).json({ success: false, message: 'Old password is incorrect' });
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.newPwd, salt);

        await User.updateOne({ _id: req.params.userId }, { password: hash });
        res.status(200).json({ success: true, message: 'Change password successfully' });
    } catch (error) {
        next(error);
    }
};
export const sendCodeVerify = async (req, res, next) => {
    try {
        const code = Math.floor(100000 + Math.random() * 900000);
        const isSent = await sendEmail(req.body.email, 'Your code: ', '' + code);
        if (isSent) res.status(200).json({ success: true, message: 'Sent code successfully', result: code });
        else res.status(200).json({ success: false, message: 'Cant send code' });
    } catch (error) {
        next(error);
    }
};
