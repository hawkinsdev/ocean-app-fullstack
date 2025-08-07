import { Router } from 'express';
import { create, list } from '../controllers/order.controller';
import { createOrderValidator } from '../validators/order.validator';
import { requireAuth } from '../auth/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear una nueva orden
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.post('/', requireAuth, createOrderValidator, create);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Listar todas las ordenes
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de ordenes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *
 */
router.get('/', requireAuth, list);

export default router;
