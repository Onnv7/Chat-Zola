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

