import mongoose from "mongoose";
import Product from "../models/ProductModel.js";

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, sku, price, stock } = req.body;

        // Step 1: Check required fields
        if (!name || !sku || price == null || stock == null) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Step 2: Check SKU already exists
        const existingProduct = await Product.findOne({ sku });

        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: "SKU already exists",
            });
        }

        // Step 3: Create product
        const product = await Product.create({
            name,
            sku,
            price,
            stock,
        });

        // Step 4: Send response
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}

//Get all products
export const getAllProducts = async (req, res) => {
    try {

        let filter = {};

        // Query param check
        if (req.query.active === "true") {
            filter.isActive = true;
        }

        if (req.query.active === "false") {
            filter.isActive = false;
        }


        // Step 1: Get only active or inactive products based on filter
        const products = await Product.find(filter);

        // Step 2: Send response
        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Get single product by id
export const getSingleProduct = async (req, res) => {
    try {

        // Step 1: Validate MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
            });
        }

        // Step 2: Find product
        const product = await Product.findById(req.params.id);

        // Step 3: Check product exists
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Step 4: Send response
        res.status(200).json({
            success: true,
            data: product,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Update product by id
export const updateProduct = async (req, res) => {
    try {
        const { name, sku, price, stock } = req.body;

        // Step 1: Validate ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
            });
        }

        // Step 2: Find product
        const product = await Product.findById(req.params.id);

        // Step 3: Check product exists
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Step 4: Update product
        if (sku) {

            const existingSKU = await Product.findOne({
                sku,
                _id: { $ne: req.params.id },
            });

            if (existingSKU) {
                return res.status(400).json({
                    success: false,
                    message: "SKU already exists",
                });
            }
        }

        // Step 5: Update fields
        product.name = name ?? product.name;
        product.sku = sku ?? product.sku;
        product.price = price ?? product.price;
        product.stock = stock ?? product.stock;

        // Step 6: Save updated product
        const updatedProduct = await product.save();

        // Step 7: Send response
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//DeActivate product by id
export const deactivateProduct = async (req, res) => {
    try {

        // Step 1: Validate ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
            });
        }

        // Step 2: Find product
        const product = await Product.findById(req.params.id);

        // Step 3: Check product exists
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Step 4: Deactivate product
        product.isActive = !product.isActive;

        // Step 5: Save changes
        await product.save();

        // Step 6: Send response
        res.status(200).json({
            success: true,
            message: "Product deactivated successfully",
            data: product,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};