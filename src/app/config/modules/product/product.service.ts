import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createProduct = async (payLoad: Product) => {
  const result = await ProductModel.create(payLoad);
  return result;
};

const getAllProducts = async (searchTerm: unknown) => {
  if (typeof searchTerm === "string") {
    const result = ProductModel.find({ $text: { $search: searchTerm } });
    return result;
  }
  const result = await ProductModel.find();
  return result;
};

const getSingleProductById = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const updateProduct = async (id: string, updatedProduct: Product) => {
  const result = await ProductModel.findByIdAndUpdate(
    id,
    {
      $set: {
        ...updatedProduct,
      },
    },
    { new: true }
  );
  return result;
};
const deleteProduct = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getSingleProductById,
  updateProduct,
  deleteProduct,
};
