import { Request, Response } from 'express';
import { createOrder, getOrders } from '../services/order.service';
import { validationResult } from 'express-validator';
import { ResponseHelper } from '../utils/response';

export const create = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    errors.mapped();
    if (!errors.isEmpty())
      return ResponseHelper.badRequest(res, errors.mapped(), 'invalid payload');

    const newOrder = req.body;
    const order = await createOrder(newOrder);
    return ResponseHelper.created(res, order, 'Order created successfully');
  } catch (error) {
    ResponseHelper.handleError(res, error);
  }
};

export const list = async (req: Request, res: Response) => {
  const orders = await getOrders();
  return ResponseHelper.success(res, orders);
};
