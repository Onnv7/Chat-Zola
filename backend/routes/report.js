import express from "express";
import {
    selectAllReportNotDone,
    createReport,
} from "../controllers/reportController.js";
const router = express.Router();

router.get("/", selectAllReportNotDone);

router.post("/", createReport);

export default router;
