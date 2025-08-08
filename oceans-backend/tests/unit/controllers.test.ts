import request from 'supertest';
import app from '../../src/app';
import * as orderService from '../../src/services/order.service';
import * as productService from '../../src/services/product.service';
import * as userService from '../../src/services/user.service';

jest.mock('../src/services/order.service');
jest.mock('../src/services/product.service');
jest.mock('../src/services/user.service');

describe('Functional Tests - API Controllers', () => {
  describe('Orders Controller', () => {
    it('should create an order successfully', async () => {
      (orderService.createOrder as jest.Mock).mockResolvedValue({
        id: '123',
        name: 'Test Order',
      });

      const res = await request(app)
        .post('/orders')
        .send({ createdBy: 'user123', items: [] });

      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe('Test Order');
      expect(orderService.createOrder).toHaveBeenCalled();
    });

    it('should return validation error when payload is invalid', async () => {
      const res = await request(app).post('/orders').send({}); // sin datos obligatorios

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('invalid payload');
    });

    it('should list all orders', async () => {
      (orderService.getOrders as jest.Mock).mockResolvedValue([
        { id: '1', name: 'Order 1' },
      ]);

      const res = await request(app).get('/orders');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
    });
  });

  describe('Products Controller', () => {
    it('should create a product successfully', async () => {
      (productService.createProduct as jest.Mock).mockResolvedValue({
        id: 'p1',
        name: 'Product 1',
      });

      const res = await request(app)
        .post('/products')
        .send({ name: 'Product 1', price: 100 });

      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe('Product 1');
    });

    it('should return validation error when product payload is invalid', async () => {
      const res = await request(app).post('/products').send({}); // sin nombre ni precio

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('name and price are required');
    });

    it('should list all products', async () => {
      (productService.getProducts as jest.Mock).mockResolvedValue([
        { id: 'p1', name: 'Product 1' },
      ]);

      const res = await request(app).get('/products');

      expect(res.status).toBe(200);
      expect(res.body.data[0].name).toBe('Product 1');
    });
  });

  describe('Users Controller', () => {
    it('should create a user successfully', async () => {
      (userService.createUser as jest.Mock).mockResolvedValue({
        id: 'u1',
        username: 'John',
      });

      const res = await request(app)
        .post('/users')
        .send({ username: 'John', email: 'john@test.com', password: '123456' });

      expect(res.status).toBe(201);
      expect(res.body.data.username).toBe('John');
    });

    it('should return validation error when user payload is invalid', async () => {
      const res = await request(app).post('/users').send({}); // vacío

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('invalid payload');
    });

    it('should list all users', async () => {
      (userService.getUsers as jest.Mock).mockResolvedValue([
        { id: 'u1', username: 'John' },
      ]);

      const res = await request(app).get('/users');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
    });

    it('should get a user by email', async () => {
      (userService.getUser as jest.Mock).mockResolvedValue({
        id: 'u1',
        username: 'John',
      });

      const res = await request(app).get('/users/john@test.com');

      expect(res.status).toBe(200);
      expect(res.body.data.username).toBe('John');
    });
  });
});
