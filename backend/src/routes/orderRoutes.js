import express from "express";

import{ createOrder, getAllOrders, getOrderById, updateOrderStatus } from"../controllers/orderController.js";
const router=express.Router();


/**
 * @route   POST /api/orders
 * @desc    Create new order
 */
router.post("/create", createOrder);

/**
 * @route   GET /api/orders
 * @desc    Get all orders (pagination + filter)
 */
router.get("/all", getAllOrders);

/**
 * @route   GET /api/orders/:id
 * @desc    Get single order with populated items
 */
router.get("/:id", getOrderById);

/**
 * @route   PATCH /api/orders/:id/status
 * @desc    Update order status
 */
router.patch("/:id/status", updateOrderStatus);

export default router;
