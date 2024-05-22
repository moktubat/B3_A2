import express, { Application, Request, Response } from "express";
import cors from "cors";
import { productRouter } from "./app/config/modules/product/product.route";
import { orderRouter } from "./app/config/modules/order/order.route";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("I am on!");
});

export default app;
