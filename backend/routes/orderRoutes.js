import express from "express";
import { cancelOrder, createOrder, getAllOrders, getSingleOrder, updateOrderStatus } from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);        // Create Order
router.get("/", protect, getAllOrders);       // Get All Orders
router.get("/:id", protect, getSingleOrder);   // Get Single Order by ID
router.patch("/:id/status", protect, updateOrderStatus);  // Update Order Status
router.patch("/:id/cancel", protect, cancelOrder);  // Cancel Order


export default router;