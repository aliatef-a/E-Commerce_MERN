import express from "express";
import { login, register } from "../services/userServices";

const router = express.Router();

router.post("/register", async (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  const { data } = await register({
    firstName,
    lastName,
    email,
    password,
  });
  response.status(data.statusCode).send(data);
});

export default router;

router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const { data } = await login({ email, password });
  response.status(data.statusCode).send(data);
});
