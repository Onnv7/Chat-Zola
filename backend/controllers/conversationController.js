import mongoose from 'mongoose';

import Conversation from '../models/conversationModel.js'

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
        const { sender, message } = req.body;
        const msg = {
            sender: sender,
            content: message,
            sentAt: Date.now()
        }
        await Conversation.updateOne(
            { _id: req.params.conversationId },
            { $push: { message: msg } },
        )
        res.status(200).json({ success: true, message: "Message sent successfully" })

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

export const getMessageFromConversation = async (req, res, next) => {
    try {
        const conversation = await Conversation.findById(req.params.conversationId)
            .populate({
                path: "participants",
                select: { name: 1 }
            })
        res.status(200).json(conversation)
    } catch (error) {
        next(error)
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
        });

        const data = list.map(conversation => {
            const lastIndex = conversation.message.length - 1;
            const lastestMsg = conversation.message[lastIndex];
            const { message, ...others } = conversation.toObject();
            return { ...others, lastestMsg };
        });

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

