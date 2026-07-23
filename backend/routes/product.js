import express from "express";
import {addProduct} from "../controller/productController.js";
import {getProducts} from "../controller/productController.js";

const router=express.Router();

router.post("/product",addProduct);
router.get("/getproducts",getProducts);

export default router;