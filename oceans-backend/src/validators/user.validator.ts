import { body } from 'express-validator';

export const userValidator = [
  body('email')
    .notEmpty()
    .withMessage('Email es requerido')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),

  body('role')
    .notEmpty()
    .withMessage('Rol es requerido')
    .isIn(['admin', 'waiter'])
    .withMessage('Rol inválido. Valores permitidos: admin, waiter'),

  body('username')
    .notEmpty()
    .withMessage('Username es requerido')
    .isString()
    .withMessage('Username debe ser texto')
    .isLength({ min: 3 })
    .withMessage('Username muy corto (mín 3 caracteres)'),

  body('password')
    .optional()
    .isString()
    .withMessage('Password debe ser texto')
    .isLength({ min: 6 })
    .withMessage('Password muy corto (mín 6 caracteres)')
    .matches(/[A-Z]/)
    .withMessage('Password debe contener al menos una mayúscula')
    .matches(/[0-9]/)
    .withMessage('Password debe contener al menos un número'),
];
