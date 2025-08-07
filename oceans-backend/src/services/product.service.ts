import { Product } from "../models/product.model";
import {
  createProductRepository,
  getProductsRepository,
} from "../repository/product.repository";

export const createProduct = async (product: Product): Promise<Product> => {
  return await createProductRepository(product);
};

export const getProducts = async (): Promise<Product[]> => {
  return await getProductsRepository();
};
