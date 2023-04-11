import express from "express";
import {
    selectAllReportNotDone,
    createReport,
    selectAllReportDone,
    getReportById,
    updateReport,
} from "../controllers/reportController.js";
const router = express.Router();

router.get("/notdone", selectAllReportNotDone);
router.get("/done", selectAllReportDone);
router.get("/:id", getReportById);
router.post("/", createReport);
router.patch("/:id", updateReport);
export default router;
