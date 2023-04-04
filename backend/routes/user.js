import express from "express";
import { sendFriendRequest, acceptNewFriend, getFriendsList, unfriend, updateProfile, getProfileByEmail, getFriendsRequestList, rejectNewFriend, getProfileById, getListOfInvitationsSent, unsendFriendRequest, getProfileMyFriend, changeAvatar, getAvatar } from "../controllers/userController.js"
const router = express.Router();

router.post('/up', changeAvatar)
router.get('/get/:public_id', getAvatar)
router.post('/send-friend-request', sendFriendRequest);
router.post('/unsend-friend-request', unsendFriendRequest);
router.post('/accept-new-friend', acceptNewFriend);
router.post('/reject-new-friend', rejectNewFriend);
router.patch('/unfriend/:userId', unfriend);
router.patch('/update-profile/:userId', updateProfile);
router.get('/get-profile/:userId', getProfileById);
router.get('/get-profile-my-friend/:userId', getProfileMyFriend);
router.get('/get-profile', getProfileByEmail);
router.get('/get-friends-list/:userId', getFriendsList);
router.get('/get-list-friend-requests/:userId', getFriendsRequestList);
router.get('/get-list-invitations-sent/:userId', getListOfInvitationsSent);

export default router