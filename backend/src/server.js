import express from "express";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import companyAuthRoutes from "./routes/companyAuthRoutes.js";

const app = express();

app.use(express.json());  // <-- Add JSON body parser middleware

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

// Mount company auth routes under /api/company
app.use("/api/company", companyAuthRoutes);

app.listen(5001, () => {
    console.log("server started on port 5001");
});
