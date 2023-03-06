import express from "express";
import { sendFriendRequest, addNewFriend, getFriendsList, unfriend, updateProfile } from "../controllers/userController.js"
const router = express.Router();

router.post('/send-friend-request', sendFriendRequest);
router.post('/send-friend-request', sendFriendRequest);
router.post('/add-new-friend', addNewFriend);
router.patch('/unfriend/:userId?friendId=:frId', unfriend);
router.get('/get-friends-list/:userId', getFriendsList);
router.put('/update-profile/:userId', updateProfile);

export default router