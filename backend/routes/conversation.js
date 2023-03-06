import express from "express";
import { sendMessageToConversation, getMessageFromConversation } from "../controllers/conversationController.js"
const router = express.Router();

router.post('/send-messages/:conversationId', sendMessageToConversation)
router.get('/get-messages/:conversationId', getMessageFromConversation)

export default router