import { Router } from "express";
import { saveProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct } from "./product.controller.js";

    const api = Router()