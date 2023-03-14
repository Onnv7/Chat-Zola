import express from "express";
import { sendFriendRequest, acceptNewFriend, getFriendsList, unfriend, updateProfile, getProfileByEmail, getFriendsRequestList, rejectNewFriend, getProfileById, getListOfInvitationsSent } from "../controllers/userController.js"
const router = express.Router();

router.post('/send-friend-request', sendFriendRequest);
router.post('/send-friend-request', sendFriendRequest);
router.post('/accept-new-friend', acceptNewFriend);
router.post('/reject-new-friend', rejectNewFriend);
router.patch('/unfriend/:userId', unfriend);
router.put('/update-profile/:userId', updateProfile);
router.get('/get-profile/:userId', getProfileById);
// router.get('/get-profile-my-friend/:userId', getProfileMyFriend);
router.get('/get-profile', getProfileByEmail);
router.get('/get-friends-list/:userId', getFriendsList);
router.get('/get-list-friend-requests/:userId', getFriendsRequestList);
router.get('/get-list-invitations-sent/:userId', getListOfInvitationsSent);

export default router