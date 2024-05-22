import { Schema, model } from "mongoose";
import { ProductModel } from "../product/product.model";
import { Order } from "./order.interface";

const orderSchema = new Schema<Order>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

orderSchema.pre("save", async function (next) {
  const result = await ProductModel.findById(this.productId);
  if (!result) {
    throw new Error("Product not found by this productId");
  }

  const {
    inventory: { quantity },
  }: any = await ProductModel.findById(this.productId);

  if (quantity < this.quantity) {
    throw new Error("Quantity available in inventory");
  }

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    this.productId,
    {
      $inc: {
        "inventory.quantity": -this.quantity,
      },
    },
    { new: true }
  );

  if (updatedProduct?.inventory.quantity === 0) {
    await ProductModel.findByIdAndUpdate(this.productId, {
      $set: {
        "inventory.inStock": false,
      },
    });
  }

  next();
});

export const OrderModel = model<Order>("Order", orderSchema);
