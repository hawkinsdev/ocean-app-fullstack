import { body } from 'express-validator';

export const createOrderValidator = [
  body('products.*.id')
    .notEmpty()
    .withMessage('El id del producto es obligatorio'),
  body('products.*.name').notEmpty().withMessage('El nombre es obligatorio'),
  body('products.*.quantity')
    .isInt({ gt: 0 })
    .withMessage('La cantidad debe ser mayor a 0'),
  body('products.*.price')
    .isFloat({ gt: 0 })
    .withMessage('El precio debe ser mayor a 0'),
  body('createdBy').notEmpty().withMessage('El id del usuario es obligatorio'),
];
