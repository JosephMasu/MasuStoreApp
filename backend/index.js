//packages
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadsRoutes from './routes/uploadsRoutes.js'
import path from "path";

//utiles
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes); 
app.use("/api/products", productRoutes);
app.use("/api/uploads", uploadsRoutes);


const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")))

app.listen(port, ()=> console.log(`Server Running on Port: ${port}`));
