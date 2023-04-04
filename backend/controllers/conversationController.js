import mongoose from 'mongoose';

import Conversation from '../models/conversationModel.js'

import cloudinary from "../utils/cloudinary.js";
export const createConversation = async (req, res, next) => {
    try {
        const conversation = new Conversation({
            ...req.body
        })
        await conversation.save()
        res.status(200).json({ success: true, message: "Created conversation" })
    } catch (error) {
        next(error)
    }
}
export const sendMessageToConversation = async (req, res, next) => {
    try {
        let msg;
        const { sender, message, sendAt, type } = req.body;
        // const sendAt = Date.now()
        if (type === 'message') {
            msg = {
                sender: sender,
                content: message,
                sentAt: sendAt,
                type
            }

        }
        else {
            let fileStr = message;
            const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'chat'
            })
            msg = {
                sender: sender,
                content: uploadedResponse.public_id,
                sentAt: sendAt,
                type,
                seen: false,
            }
        }
        const conversation = await Conversation.findByIdAndUpdate(
            { _id: req.params.conversationId },
            { $push: { message: msg } },
            { new: true },
        )
        const messages = conversation.message
        const data = messages[messages.length - 1]

        res.status(200).json({ success: true, message: "Message sent successfully", data })

    } catch (error) {
        next(error)
    }
}

export const deleteConversation = async (req, res, next) => {
    try {
        const rs = await Conversation.findByIdAndDelete(req.params.conversationId);


    } catch (error) {
        next(error);
    }
}

export const getOneConversation = async (req, res, next) => {
    try {
        const conversation = await Conversation.findById(req.params.conversationId)
            .populate({
                path: "participants",
                select: { name: 1, avatar: 1 }
            })
            .select({
                message: 0
            });
        res.status(200).json(conversation)
    } catch (error) {
        next(error)
    }
}
export const getFewMessages = async (req, res, next) => {
    try {
        const numberSkip = 10
        const skip = Number(req.params.skip);
        let { message } = await Conversation.findById(req.params.conversationId)
            .select({
                _id: 0,
                message: 1
            });
        if (skip > message.length) {
            res.status(200).json([])
            return;
        }
        let start = message.length - numberSkip - skip;
        let end = start + numberSkip;
        if (start < 0) {
            start = 0
        }
        if (message.length <= numberSkip) {
            start = 0;
            end = message.length
        }
        // console.log(message.slice(0, 2))
        message = message.slice(start, end);
        res.status(200).json(message)
    } catch (error) {
        next(error);
    }
}
export const getAllConversations = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const list = await Conversation.find({
            participants: { $in: [userId] }
        }).populate({
            path: 'participants',
            select: 'name avatar _id'
        }).then(conversations => {
            return conversations.map(conversation => {
                const filteredParticipants = conversation.participants.filter(participant => participant._id !== userId);
                return { ...conversation._doc, participants: filteredParticipants };
            });
        });;

        const data = list.map(conversation => {
            const lastIndex = conversation.message.length - 1;
            const latestMsg = conversation.message[lastIndex];
            const { message, ...others } = conversation;
            return { ...others, latestMsg: latestMsg === undefined ? null : latestMsg };
        });


        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

