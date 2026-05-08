import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";

// Create a new order
export const createOrder = async (req, res) => {
    try {

        //step 1: find Products 
        const { products } = req.body;

        //step 2: Check products exist
        if (!products || products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one product is required",
            });
        }

        //step 3: Check and Calculate total amount
        let totalAmount = 0;
        for (const item of products) {
            const product = await Product.findById(item.product);

            // Product exists?
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }

            // Product active?
            if (!product.isActive) {
                return res.status(400).json({
                    success: false,
                    message: `${product.name} is inactive`,
                });
            }

            if (item.quantity <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Quantity must be greater than 0",
                });
            }

            // Stock available?
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}`,
                });
            }

            // Calculate total amount
            totalAmount += product.price * item.quantity;

        }

        //step 4:Reduce stock
        for (const item of products) {
            const product = await Product.findById(item.product);

            product.stock -= item.quantity;

            await product.save();
        }

        //step 5: Create order
        const order = await Order.create({ products, totalAmount });

        //step 6: Return success response
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        //step 1: Fetch all orders with product details
        const orders = await Order.find().populate("products.product");

        //step 2: Return success response
        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Get single order by ID
export const getSingleOrder = async (req, res) => {
    try {

        //step 1: Fetch order by ID with product details
        const order = await Order.findById(req.params.id).populate("products.product");

        //step 2: Order exists?
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        //step 3: Return success response
        res.status(200).json({
            success: true,
            data: order,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Order Status PENDING → COMPLETED
export const updateOrderStatus = async (req, res) => {
    try {

        //step 1: Get new status from request body
        const { status } = req.body;

        //step 2: Allowed status validation
        const allowedStatus = ["PENDING", "COMPLETED", "CANCELLED"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }

        //step 3: Find order by ID
        const order = await Order.findById(req.params.id);

        //step 4: Order exists?
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        //step 5: Update status
        order.status = status;

        //step 6: Save order
        await order.save();

        //step 7: Return success response
        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: order,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


//Cancel Order PENDING → CANCELLED
export const cancelOrder = async (req, res) => {
    try {

        //step 1: Find order by ID
        const order = await Order.findById(req.params.id);

        //step 2: Order exists?
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        // Step 3: Already cancelled?
        if (order.status === "CANCELLED") {
            return res.status(400).json({
                success: false,
                message: "Order already cancelled",
            });
        }

        // Step 4: Completed order cannot be cancelled
        if (order.status === "COMPLETED") {
            return res.status(400).json({
                success: false,
                message: "Completed order cannot be cancelled",
            });
        }

        // Step 5: Restore stock
        for (const item of order.products) {
            const product = await Product.findById(item.product);

            if (product) {
                product.stock += item.quantity;

                await product.save();
            }
        }

        // Step 6: Update status
        order.status = "CANCELLED";

        // Step 7: Save order
        await order.save();

        // Step 8: Return success response
        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            data: order,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};