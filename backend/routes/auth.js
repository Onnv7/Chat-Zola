import express from "express";
import { register, login, changePassword, sendCodeVerify, getNewPassword } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/change-password/:userId", changePassword);
router.post("/send-confirmation-code", sendCodeVerify);
router.post("/get-new-password", getNewPassword);
export default router;
