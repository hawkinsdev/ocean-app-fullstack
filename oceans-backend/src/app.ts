import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from './docs/swagger';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();

const specs = swaggerJsdoc(swaggerOptions);
app.use(cors());

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/login', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

app.get('/health', (_, res) => {
  res.status(200).json({ status: 'OK' });
});

export default app;
