import express from "express";
const router = express.Router();
import {
  createMenuItem,
  getAllMenuItems,
 getMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
} from "../controllers/menuController.js";




/**
 * @route   POST /api/menu
 * @desc    Create new menu item
 */
router.post("/", createMenuItem);

/**
 * @route   GET /api/menu
 * @desc    Get all menu items with filters
 */
router.get("/", getAllMenuItems);

/**
 * @route   GET /api/menu/:id
 * @desc    Get single menu item by ID
 */
router.get("/:id", getMenuItem);

/**
 * @route   PUT /api/menu/:id
 * @desc    Update menu item
 */
router.put("/:id", updateMenuItem);

/**
 * @route   DELETE /api/menu/:id
 * @desc    Delete menu item
 */
router.delete("/:id", deleteMenuItem);

/**
 * @route   PATCH /api/menu/:id/availability
 * @desc    Toggle availability
 */
router.patch("/:id/availability", toggleAvailability);

export default router;
