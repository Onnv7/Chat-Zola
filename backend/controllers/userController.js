import mongoose from "mongoose";


import User from "../models/userModel.js";
import Conversation from "../models/conversationModel.js";

export const sendFriendRequest = async (req, res, next) => {
    try {
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
        session.endSession();

        next(error);
    }
}

