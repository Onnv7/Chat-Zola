import mongoose from "mongoose";
import { createError } from "../utils/error.js";

import User from "../models/userModel.js";
import Conversation from "../models/conversationModel.js";

export const sendFriendRequest = async (req, res, next) => {
    try {
        // TODO: chưa check id người gửi
        const friend = await User.findOne({ friendRequest: req.body.senderId })
        if (friend !== null) {
            res.status(404).json({ success: false, message: `Already sent a friend request before` })
        }

        await User.updateOne(
            { _id: req.body.receiverId },
            { $push: { friendRequest: req.body.senderId } }
        );
        res.status(200).json({ success: true, message: "Invitation sent successfully" })

    } catch (error) {
        next(error);
    }
}

export const addNewFriend = async (req, res, next) => {
    let session = await mongoose.startSession();
    try {
        const friend = await User.findOne({ friendRequest: req.body.senderId })
        if (friend === null) {
            res.status(404).json({ success: false, message: `The friend with id ${req.body.senderId} hasn't sent a friend request yet` })
        }
        else {

            session.startTransaction();
            // Receiver accepted a friend request
            await User.updateOne(
                { _id: req.body.receiverId },
                {
                    $pull: { friendRequest: req.body.senderId },
                    $push: { friendsList: req.body.senderId }
                }
            );
            // Sender 
            await User.updateOne(
                { _id: req.body.senderId },
                {
                    $push: { friendsList: req.body.receiverId }
                }
            );

            // Create a new conversation
            const conversation = new Conversation({
                participants: [req.body.receiverId, req.body.senderId]
            })
            await conversation.save()

            await session.commitTransaction();
            res.status(200).json({ success: true, message: `Successful connection to user ${req.body.senderId}` })
        }


    } catch (error) {
        await session.abortTransaction();

        next(error);
    }
    finally {
        session.endSession();
    }
}

export const getFriendsList = async (req, res, next) => {
    try {
        const list = await User.findById(req.params.userId)
            .populate('friendsList', 'name avatar -_id')
            .select({ friendsList: 1, _id: 0 });
        console.log(list);
        res.status(200).json({ success: true, data: list.friendsList });
    } catch (error) {
        next(error)
    }
}

export const unfriend = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        await User.updateOne(
            { _id: req.params.userId },
            { $pull: { friendsList: req.query.friendId } }
        )

        await User.updateOne(
            { _id: req.query.friendId },
            { $pull: { friendsList: req.params.userId } }
        )
        await session.commitTransaction();
        res.status(200).json({ success: true, message: "Unfriend successfully" })
    } catch (error) {
        await session.abortTransaction();
        next(error)
    }
    finally {
        session.endSession();
    }
}

export const updateProfile = async (req, res, next) => {
    try {
        const result = await User.updateOne(
            { _id: req.params.userId },
            { ...req.body }
        )
        if (result.matchedCount !== 0) {

            res.status(200).json({ success: true, message: "Update successfully" })
            return
        }
        res.status(404).json({ success: false, message: "No records found to update" })
    } catch (error) {
        next(error);
    }
}
export const getProfileByEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.query.email })
        if (user === null) {
            res.status(200).json(null);
            return;
        }
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others });
    } catch (error) {
        next(error);
    }
}

export const getFriendsRequestList = async (req, res, next) => {
    try {
        const list = await User.findById(req.params.userId)
                                .populate({
                                    path: 'friendRequest',
                                    select: '_id name'
                                })
                                .select({_id: 0, friendRequest: 1})
        res.status(200).json({...list});
    } catch (error) {
        next(error);
    }
}