import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import productRoute from "./routes/productsRoutes";
import cartRoute from "./routes/cartRoutes";
import { seedInitialProducts } from "./services/productServices";

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/user", userRoutes);
app.use("/products", productRoute);
app.use("/cart", cartRoute);

// set initial products
seedInitialProducts();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
