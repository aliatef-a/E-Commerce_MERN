import express from "express";
import { getAllProducts } from "../services/productServices";

const router = express.Router();

router.get("/", async (request, response) => {
  const { data } = await getAllProducts();
  response.status(data.statusCode).send(data);
});

export default router;
