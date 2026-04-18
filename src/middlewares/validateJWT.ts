import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../modules/userModel";

interface ExtendRequest extends Request {
  user?: any;
}

export const validateJWT = (
  request: ExtendRequest,
  response: Response,
  next: NextFunction,
) => {
  const authorizationHeader = request.get("authorization");

  if (!authorizationHeader) {
    response
      .status(403)
      .send({ data: { message: "Authorization header not provided" } });
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    response.status(403).send({ data: { message: "Bearer token not found" } });
    return;
  }

  jwt.verify(
    token,
    "HyXyT8Qx1p0rUYLk0GFNuvzQTZFELIeU",
    async (err, payload) => {
      if (err || !payload) {
        response.status(403).send({ data: { message: "Invaild token" } });
        return;
      }

      const userPayload = payload as {
        email: string;
        firstName: string;
        lastName: string;
      };

      const user = await userModel.findOne({ email: userPayload.email });
      request.user = user;
      next();
    },
  );
};
