import express from "express";
import { sendMessageToConversation, getMessageFromConversation, getAllConversations, deleteConversation } from "../controllers/conversationController.js"
const router = express.Router();

router.post('/send-messages/:conversationId', sendMessageToConversation)
router.post('/delete-conversation/:conversationId', deleteConversation)
router.get('/get-messages/:conversationId', getMessageFromConversation)
router.get('/get-conversations-list/:userId', getAllConversations)

export default router