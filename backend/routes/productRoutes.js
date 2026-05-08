import express from 'express';
import { createProduct, deactivateProduct, getAllProducts, getSingleProduct, updateProduct } from '../controllers/productController.js';
import protect from '../middleware/authMiddleware.js';


const router = express.Router();


router.post("/", protect, createProduct);       // Create Product
router.get("/", protect, getAllProducts);       // Get All Products
router.get("/:id", protect, getSingleProduct);  // Get Single Product by ID
router.put("/:id", protect, updateProduct);       // Update Product by ID
router.patch("/:id/deactivate", protect, deactivateProduct); // Deactivate Product by ID

export default router;