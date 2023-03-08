import mongoose from "mongoose";
import { createError } from "../utils/error.js";

import User from "../models/userModel.js";
import Conversation from "../models/conversationModel.js";

export const sendFriendRequest = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        // TODO: chưa check id người gửi
        session.startTransaction();

        const sender = await User.updateOne(
            { _id: req.body.senderId },
            { $push: { invitationSent: req.body.receiverId } }
        );
        // console.log("🚀 ~ file: userController.js:17 ~ sendFriendRequest ~ sender:", sender)
        if (sender.matchedCount === 0) {
            throw createError(404, "Sender not found");
        }
        // const receiver = await User.findOne({ _id: req.body.receiverId });
        // if (receiver !== null) {
        //     res.status(404).json({ success: false, message: `Already sent a friend request before` })
        // }

        await User.updateOne(
            { _id: req.body.receiverId },
            { $push: { friendRequest: req.body.senderId } }
        );
        session.commitTransaction();
        res.status(200).json({ success: true, message: "Invitation sent successfully" })

    } catch (error) {
        await session.abortTransaction();
        next(error);
    }
    finally {
        session.endSession();
    }
}

export const acceptNewFriend = async (req, res, next) => {
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
                    $push: { friendsList: req.body.receiverId },
                    $pull: { invitationSent: req.body.receiverId }
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

export const rejectNewFriend = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        await User.updateOne(
            { _id: req.body.userId },
            { $pull: { friendRequest: req.body.friendId } }
        );
        await User.invitationSent(
            { _id: req.body.friendId },
            { $pull: { friendRequest: req.body.userId } }
        );
        session.commitTransaction();
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
            .populate('friendsList', 'name avatar')
            .select({ friendsList: 1, _id: 0 });
        console.log(list);
        res.status(200).json(list.friendsList);
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

export const getProfileById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        // TODO: gắn thêm flag để biết user này có phải là bạn bè không
        if (user === null) {
            res.status(404).json(null);
            return;
        }
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others });
    } catch (error) {
        next(error);
    }
}

// export const getProfileMyFriend = async (req, res, next) => {
//     try {
//     } catch (error) {
//         next(error);
//     }
// }

export const getFriendsRequestList = async (req, res, next) => {
    try {
        const list = await User.findById(req.params.userId)
            .populate({
                path: 'friendRequest',
                select: '_id name'
            })
            .select({ _id: 0, friendRequest: 1 })
        const { friendRequest } = { ...list._doc }
        res.status(200).json(friendRequest);
    } catch (error) {
        next(error);
    }
}

export const getListOfInvitationsSent = async (req, res, next) => {
    try {
        const list = await User.findById(req.params.userId)
            .populate({
                path: 'invitationSent',
                select: '_id name avatar'
            })
            .select({ _id: 0, invitationSent: 1 });

        const { invitationSent } = list._doc;
        res.status(200).json(invitationSent);
    } catch (error) {
        next(error);
    }
}