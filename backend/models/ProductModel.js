import mongoose from "mongoose";
import productSchema from "../schemas/ProductSchema.js";

const Product = mongoose.model("Product", productSchema);

export default Product;