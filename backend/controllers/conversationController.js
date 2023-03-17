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
        const { sender, message, sendAt } = req.body;
        // const sendAt = Date.now()
        const msg = {
            sender: sender,
            content: message,
            sentAt: sendAt
        }
        await Conversation.findByIdAndUpdate(
            { _id: req.params.conversationId },
            { $push: { message: msg } },
        )
        res.status(200).json({ success: true, message: "Message sent successfully" })
        // res.status(200).json({ ...msg, sentAt: new Date(sendAt) })

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
                select: { name: 1 }
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
        const skip = Number(req.params.skip);
        let { message } = await Conversation.findById(req.params.conversationId)
            .select({
                _id: 0,
                message: 1
            });
        // console.log("🚀 ~ file: conversationController.js:71 ~ getFewMessages ~ message.length:", message.length)
        if (skip > message.length) {
            res.status(200).json([])
            return;
        }
        let start = message.length - 10 - skip;
        let end = start + 10;
        if (start < 0) {
            start = 0
        }
        if (message.length <= 10) {
            start = 0;
            end = message.length - 1
        }
        message = message.slice(start, end);
        // console.log(start, end, message.length)
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
        });

        const data = list.map(conversation => {
            const lastIndex = conversation.message.length - 1;
            const latestMsg = conversation.message[lastIndex];
            const { message, ...others } = conversation.toObject();
            return { ...others, latestMsg };
        });

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

