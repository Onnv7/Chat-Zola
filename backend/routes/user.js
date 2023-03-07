import express from "express";
import { sendFriendRequest, addNewFriend, getFriendsList, unfriend, updateProfile, getProfileByEmail } from "../controllers/userController.js"
const router = express.Router();

router.post('/send-friend-request', sendFriendRequest);
router.post('/send-friend-request', sendFriendRequest);
router.post('/add-new-friend', addNewFriend);
router.patch('/unfriend/:userId', unfriend);
router.put('/update-profile/:userId', updateProfile);
router.get('/get-profile', getProfileByEmail);
router.get('/get-friends-list/:userId', getFriendsList);

export default router