import express from "express";
import multer from 'multer';
import {
    signin,
    signup,
    getAllUser,
    lockUser, uploadAvatarDefault
} from "../controllers/adminController.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/getAllUser", getAllUser);
router.patch("/lockUser/:userId", lockUser);
router.post("/lockUser/:userId", lockUser);
router.post("/upload/avatar-default", upload.single('image'), uploadAvatarDefault);
export default router;
