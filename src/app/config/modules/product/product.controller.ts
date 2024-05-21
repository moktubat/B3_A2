import { Request, Response } from "express";
import { productServices } from "./product.service";
import { productValidationSchema } from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const product = productValidationSchema.parse(data);

    const result = await productServices.createProduct(product);

    res.json({
      success: true,
      message: "Product has been created!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      data: err,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await productServices.getAllProducts(searchTerm);
    res.json({
      success: true,
      message: "Show All Products!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      data: err,
    });
  }
};
const getSingleProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductById(productId);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Product not found!",
        data: result,
      });
    }
    res.json({
      success: true,
      message: "Show Single Product!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      data: err,
    });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const data = req.body;
    const updatedProduct = productValidationSchema.parse(data);
    const result = await productServices.updateProduct(
      productId,
      updatedProduct
    );
    res.json({
      success: true,
      message: "Product has been updated!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      data: err,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await productServices.deleteProduct(productId);
    res.json({
      success: true,
      message: "Product has deleted successfully!",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      data: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProductById,
  updateProduct,
  deleteProduct,
};
