import express from "express";
import { sendMessageToConversation, getOneConversation, getAllConversations, deleteConversation, getFewMessages } from "../controllers/conversationController.js"
const router = express.Router();

router.post('/send-messages/:conversationId', sendMessageToConversation)
router.post('/delete-conversation/:conversationId', deleteConversation)
router.get('/get-messages/:conversationId', getOneConversation)
router.get('/messages/:conversationId/:skip', getFewMessages)
router.get('/get-conversations-list/:userId', getAllConversations)

export default router