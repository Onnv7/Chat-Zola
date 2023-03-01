import Conversation, { messageSchema } from '../models/conversationModel.js'

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
export const addMessageToConversation = async (req, res, next) => {
    try {
        const conversation = Conversation.findOne(req.body._id)
        const data = req.body;
        const msg = new messageSchema({ ...data })

    } catch (error) {
        next(error)
    }
}

