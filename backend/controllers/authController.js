import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail.js';
import dotenv from "dotenv";
import Token from '../models/tokenModel.js';
dotenv.config();
// register a new user
export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
            avatar: "https://res.cloudinary.com/dtvnsczg8/image/upload/v1683376878/Zola/avatar/user_avatar_default.png"
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

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.TOKEN_KEY, {
            expiresIn: 3600 * 24 * 30
        });
        const refreshToken = jwt.sign({ id: user._id, email: user.email }, process.env.REFRESH_TOKEN_KEY);
        const dataToken = await Token.findOne({ email: req.body.email })
        if (dataToken) {
            dataToken.refreshToken = refreshToken
            dataToken.save()
        }
        else {
            const newDataToken = new Token({
                email: req.body.email,
                refreshToken: refreshToken
            })
            await newDataToken.save();
        }
        const { password, friendsList, friendRequest, invitationSent, ...otherDetails } = user._doc;

        res.status(200)
            .json({ ...otherDetails, token, refreshToken });
    } catch (err) {
        next(err);
    }
};

export const changePassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
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
        const mode = req.query.mode;
        const email = req.body.email;
        if (mode === "forget") {
            const user = await User.findOne({ email: email });
            if (!user) return res.status(200).json({ success: false, message: "User not found" });
        }
        const code = Math.floor(100000 + Math.random() * 900000);
        const isSent = await sendEmail(email, 'Your code: ', '' + code);
        if (isSent) res.status(200).json({ success: true, message: 'Sent code successfully', result: code });
        else res.status(200).json({ success: false, message: 'Cant send code' });
    } catch (error) {
        next(error);
    }
};

export const getNewPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status({ success: false, message: "User not found" });
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        user.password = hash;
        await user.save();
        res.status(200).json({ success: true, message: "Change successfully" });
    } catch (error) {
        next(error);
    }
};

export const authenticateToken = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) return res.status(401).json({ success: false, message: "Dont have authorization header" });

        const token = authorizationHeader.split(' ')[1];
        if (!token) return res.status(401).json({})

        jwt.verify(token, process.env.TOKEN_KEY, (err, data) => {
            if (err) {
                if (err.name === "TokenExpiredError")
                    return res.status(401).json({ success: false, message: err.message })
                else if (err.name === "JsonWebTokenError")
                    return res.status(498).json({ success: false, message: err.message })

                return res.status(498).json({ success: false, message: err.message })
            }
            next()
        })
    } catch (error) {

    }
}

export const refreshToken = async (req, res, next) => {
    try {
        // const refreshToken = req.cookies.refresh_token
        const refreshToken = req.headers.refreshtoken;
        const rfToken = await Token.findOne({ email: req.body.email })
        if (!rfToken) return res.status(498).json({ success: false, message: "Not found user" })
        else if (rfToken.refreshToken !== refreshToken) return res.status(498).json({ success: false, message: "Refresh token is invalid" })

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, data) => {
            if (err) return res.status(498).json({ success: false, message: err.message })
            const { iat, ...others } = data
            const token = jwt.sign({ ...others }, process.env.TOKEN_KEY, {
                expiresIn: 3600 * 24 * 30
            });
            res.status(200).json({ success: true, message: "Refreshing token successfully", token: token })
        });
    } catch (error) {
        next(error);
    }
}