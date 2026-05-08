import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoute from "./routes/productRoutes.js";   
import orderRoute from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";


import connectDB from "./config/db.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Coonect to database
await connectDB();

//Middlewares
app.use(cors());
app.use(express.json());

//App API routes
app.get("/", (req, res) => {
    res.send("Welcome to the backend of the application");
}); 
app.use("/api/products",productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});