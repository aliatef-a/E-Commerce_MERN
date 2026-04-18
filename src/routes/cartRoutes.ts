import express, { response } from "express";
import { getActiveCartForUser } from "../services/cartService";
import { validateJWT } from "../middlewares/validateJWT";

const router = express.Router();

router.get("/", validateJWT, async (request, response) => {
  const userId = (request as any).user._id;
  const { data } = await getActiveCartForUser({ userId });
  response.status(data.statusCode).send(data);
});

export default router;
