import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IProduct } from "./productModels";

const CartStatusEnum = ["active", "completed"];
export interface ICartItems extends Document {
  product: IProduct;
  unitePrice: number;
  quantity: number;
}

export interface ICart extends Document {
  userId: ObjectId | string;
  items: ICartItems[];
  totalAmount: number;
  status: "active" | "completed";
}

const CartSItemschema = new Schema<ICartItems>({
  product: { type: Schema.Types.ObjectId, ref: "Products", required: true },
  quantity: { type: Number, required: true, default: 1 },
  unitePrice: { type: Number, required: true },
});

export const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [CartSItemschema],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: CartStatusEnum, default: "active" },
});

export const cartModel = mongoose.model<ICart>("Cart", cartSchema);
