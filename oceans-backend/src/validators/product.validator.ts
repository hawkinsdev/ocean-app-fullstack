import { body } from "express-validator";

export const createProductValidator = [
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("price").isFloat({ gt: 0 }).withMessage("El precio debe ser mayor a 0"),
];
