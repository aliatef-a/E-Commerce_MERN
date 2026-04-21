import express, { response } from "express";
import { addItemToCart, getActiveCartForUser } from "../services/cartService";
import { validateJWT } from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendsRequest";

const router = express.Router();

router.get("/", validateJWT, async (request: ExtendRequest, response) => {
  const userId = request.user._id;
  const { data } = await getActiveCartForUser({ userId });
  response.status(data.statusCode).send(data);
});

router.post("/items", validateJWT, async (request: ExtendRequest, response) => {
  const userId = request.user._id;
  const { productId, quantity } = request.body;
  const { data } = await addItemToCart({ userId, productId, quantity });


  return response.status(data.statusCode).send(data);
});

export default router;
