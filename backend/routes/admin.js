import express from "express";
import {
    signin,
    signup,
    getAllUser,
    lockUser,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/getAllUser", getAllUser);
router.patch("/lockUser/:userId", lockUser);
export default router;
