import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./jwt";
import { ResponseHelper } from "../utils/response";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return ResponseHelper.unauthorized(res, "Token no proporcionado");
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return ResponseHelper.unauthorized(res, "Token invalido");
  }
};
