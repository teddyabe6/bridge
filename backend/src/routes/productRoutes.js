import express from "express";
import { getAllProduct, createProduct, getProduct, updateProduct, deleteProduct} from "../controllers/productController.js";

const router = express.Router();
getProduct
router.get("/", getAllProduct)
router.get("/:id", getProduct)
router.post("/", createProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export default router;