import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IOrderItems {
    productTitle: string;
    productImage: string;
    unitPrice: number;
    quntity: number;
}

export interface IOrder extends Document {
    orderItems: IOrderItems[];
    total: number;
    address: string;
    userId: ObjectId | string;
}

const OrderItemSchema = new Schema<IOrderItems>({
    productTitle: { type: String, required: true },
    productImage: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quntity: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>({
    orderItems: { type: [OrderItemSchema] },
    total: { type: Number, required: true },
    address: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const orderModel = mongoose.model<IOrder>("Order", OrderSchema);
