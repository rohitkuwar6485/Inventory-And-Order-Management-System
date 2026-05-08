import mongoose from "mongoose";
import orderSchema from "../schemas/OrderSchema.js";

const Order = mongoose.model("Order", orderSchema);

export default Order;