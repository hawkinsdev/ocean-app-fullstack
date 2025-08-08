import { db } from '../config/firebase';
import { Order } from 'src/models/order.model';
import { getUserByIdRepository } from './user.repository';

export const getOrdersRepository = async (): Promise<Order[]> => {
  const ordersSnapshot = await db.collection('orders').get();
  const orders = await Promise.all(
    ordersSnapshot.docs.map(async doc => {
      const order = doc.data() as Order;
      const user = await getUserByIdRepository(order.createdBy);
      return {
        ...order,
        id: doc.id,
        createdBy: user?.username,
      };
    })
  );
  return orders;
};

export const createOrderRepository = async (
  orders: Omit<Order, 'id'>
): Promise<Order | null> => {
  const createdAt = new Date().toISOString();

  const order = {
    ...orders,
    closed: true,
    createdAt,
  };

  const orderRef = await db.collection('orders').add(order);
  const orderSnapshot = await orderRef.get();

  if (orderSnapshot.exists) {
    const orderData = orderSnapshot.data() as Order;
    return orderData;
  }

  return null;
};
