import { z } from "zod";

export const orderValidationSchema = z.object({
  email: z
    .string()
    .email("Please provide an valid email")
    .min(1, "Email is required"),

  productId: z.string().min(1, "ProductId is required"),

  price: z.number().min(1, "Price is required"),

  quantity: z.number().min(1, "Quantity is required"),
});
