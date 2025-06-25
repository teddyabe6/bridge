import express from "express";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import companyAuthRoutes from "./routes/companyAuthRoutes.js";


const PORT = process.env.PORT || '5001';


const app = express();
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use(express.json());  // <-- Add JSON body parser middleware

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

// Mount company auth routes under /api/company
app.use("/api/company", companyAuthRoutes);

app.listen(PORT, () => {
    console.log("server started");
})

