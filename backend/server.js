import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "./config/redis.js";
import "./workers/productWorker.js";
import productRoutes from "./routes/product.js";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

    console.log("Mongo Connected")
 
}) 
.catch(console.log);

app.use("/api",productRoutes);

app.listen(process.env.PORT,()=>{

    console.log("Server Started")

})