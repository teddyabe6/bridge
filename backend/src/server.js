import express from "express";
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"


const app = express();

app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)

app.listen(5001, () => {
    console.log("server started");
})