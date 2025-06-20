import express from "express";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const PORT = process.env.PORT || '5001';

const app = express();
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)

app.listen(PORT, () => {
    console.log("server started");
})