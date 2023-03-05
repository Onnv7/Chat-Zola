import express from "express";
import { sendMessageToConversation } from "../controllers/conversationController.js"
const router = express.Router();

router.post('/send-message/:conversationId', sendMessageToConversation)

export default router