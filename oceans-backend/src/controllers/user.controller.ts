import { Request, Response } from 'express';
import { createUser, getUser, getUsers } from '../services/user.service';
import { validationResult } from 'express-validator';
import { ResponseHelper } from '../utils/response';

export const create = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    errors.mapped();
    if (!errors.isEmpty())
      return ResponseHelper.badRequest(res, errors.mapped(), 'invalid payload');

    const newUser = req.body;
    const user = await createUser(newUser);
    return ResponseHelper.created(res, user, 'User created successfully');
  } catch (error) {
    ResponseHelper.handleError(res, error);
  }
};

export const list = async (req: Request, res: Response) => {
  const orders = await getUsers();
  return ResponseHelper.success(res, orders);
};

export const get = async (req: Request, res: Response) => {
  const { email } = req.params;
  const user = await getUser(email);
  return ResponseHelper.success(res, user);
};
