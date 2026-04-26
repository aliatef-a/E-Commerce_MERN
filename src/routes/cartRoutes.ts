import express, { response } from "express";
import { addItemToCart, checkOut, clearCart, deleteItemFormCart, getActiveCartForUser, updateItemInCart } from "../services/cartService";
import { validateJWT } from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendsRequest";

const router = express.Router();

router.get("/", validateJWT, async (request: ExtendRequest, response) => {
  const userId = request.user._id;
  const { data } = await getActiveCartForUser({ userId });
  response.status(data.statusCode).send(data);
});

router.delete("/", validateJWT, async (request: ExtendRequest, response) => {
  const userId = request.user._id;
  const { data } = await clearCart({ userId });
  response.status(data.statusCode).send(data);
})

router.post("/items", validateJWT, async (request: ExtendRequest, response) => {
  const userId = request.user._id;
  const { productId, quantity } = request.body;
  const { data } = await addItemToCart({ userId, productId, quantity });
  return response.status(data.statusCode).send(data);
});

router.put("/items", validateJWT, async (request: ExtendRequest, response) => {
  const userId = request.user._id;
  const { productId, quantity } = request.body;
  const { data } = await updateItemInCart({ userId, productId, quantity });
  return response.status(data.statusCode).send(data);
});

router.delete("/items/:productId", validateJWT, async (request: ExtendRequest, response) => {
  const userId = request.user._id;
  const { productId } = request.params
  const { data } = await deleteItemFormCart({ userId, productId });
  return response.status(data.statusCode).send(data)
})

router.post("/checkout", validateJWT, async (request: ExtendRequest, response) => {
  const userId = request.user._id;
  const { address } = request.body
  const { data } = await checkOut({ userId, address });
  return response.status(data.statusCode).send(data);
})
export default router;
