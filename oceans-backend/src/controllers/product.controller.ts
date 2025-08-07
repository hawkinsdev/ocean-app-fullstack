import { Request, Response } from "express";
import { createProduct, getProducts } from "../services/product.service";
import { validationResult } from "express-validator";
import { ResponseHelper } from "../utils/response";

export const create = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return ResponseHelper.badRequest(
        res,
        true,
        "name and price are required"
      );

    const newProduct = req.body;
    const product = await createProduct(newProduct);
    return ResponseHelper.created(res, product, "Product created");
  } catch (error) {
    ResponseHelper.handleError(res, error);
  }
};

export const list = async (req: Request, res: Response) => {
  const products = await getProducts();
  return ResponseHelper.success(res, products);
};
