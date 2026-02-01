import express from "express";
import { getTopSellingMenuItems } from "../controllers/reportController.js";

const router = express.Router();

/**
 * @route   GET /api/reports/top-selling
 * @desc    Get top 5 selling menu items
 */
router.get("/top-selling", getTopSellingMenuItems);

export default router;
