import {
  createOrderRepository,
  getOrdersRepository,
} from '../repository/order.repository';
import { Order } from '../models/order.model';

export const createOrder = async (order: Omit<Order, 'id'>) => {
  const total = order.products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  if (total <= 0) throw new Error('El total debe ser mayor a 0');
  if (total !== order.total) throw new Error('El total no coincide');

  const newOrder = await createOrderRepository(order);
  return newOrder;
};

export const getOrders = async (): Promise<Order[]> => {
  return await getOrdersRepository();
};
