import { db } from '../config/firebase';
import { Order } from 'src/models/order.model';

export const getOrdersRepository = async (): Promise<Order[]> => {
  const ordersSnapshot = await db.collection('orders').get();
  const orders = ordersSnapshot.docs.map(doc => doc.data() as Order);
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
