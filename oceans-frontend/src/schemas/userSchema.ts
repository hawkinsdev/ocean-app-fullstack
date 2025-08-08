import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(1, "El usuario es obligatorio"),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true; // opcional
        return val.length >= 6 && /[A-Z]/.test(val) && /[0-9]/.test(val);
      },
      {
        message:
          "Password debe tener mínimo 6 caracteres, una mayúscula y un número",
      }
    ),
  role: z.enum(["admin", "waiter"]),
});

export type TUserSchema = z.infer<typeof userSchema>;
