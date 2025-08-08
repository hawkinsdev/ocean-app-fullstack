import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
  description: z.string().min(5, "Mínimo 5 caracteres"),
  price: z
    .number({ message: "Debe ser un número" })
    .positive("Precio debe ser positivo"),
  image: z.string().url("URL inválida"),
  quantity: z
    .number({ message: "Debe ser un número" })
    .int("Cantidad debe ser un entero")
    .nonnegative("Cantidad no puede ser negativa"),
});

export type ProductFormType = z.infer<typeof productSchema>;
