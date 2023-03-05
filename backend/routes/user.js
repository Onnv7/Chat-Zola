import express from "express";
import { sendFriendRequest, addNewFriend } from "../controllers/userController.js"
const router = express.Router();

router.post('/send-friend-request', sendFriendRequest);
router.post('/add-new-friend', addNewFriend);

export default router