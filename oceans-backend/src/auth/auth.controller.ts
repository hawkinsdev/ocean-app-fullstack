import { Request, Response } from "express";
import { db } from "../config/firebase";
import bcrypt from "bcrypt";
import { generateToken } from "./jwt";
import { ResponseHelper } from "../utils/response";
import { User } from "../models/user.model";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const usersSnapshot = await db
    .collection("users")
    .where("email", "==", email)
    .get();
  if (usersSnapshot.empty)
    return ResponseHelper.notFound(res, "Usuario no encontrado");

  const userDoc = usersSnapshot.docs[0];
  const user = userDoc.data() as User;

  const valid = await bcrypt.compare(password, user.password as string);
  if (!valid) return ResponseHelper.unauthorized(res, "Contraseña incorrecta");

  const token = generateToken({
    uid: userDoc.id,
    role: user.role,
    email: user.email,
  });

  return ResponseHelper.success(res, {
    token,
    user: {
      id: userDoc.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
};
