import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrder = async (payLoad: Order) => {
  const result = await OrderModel.create(payLoad);
  return result;
};

const getAllOrders = async (email: unknown) => {
  if (typeof email === "string") {
    const result = await OrderModel.find({ email });
    return result;
  }
  const result = await OrderModel.find();
  return result;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
};
