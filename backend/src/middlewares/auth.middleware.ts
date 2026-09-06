import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/jwt.service.js";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Token de autenticação não fornecido.",
    });
    return;
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    res.status(401).json({
      message: "Token de autenticação não fornecido.",
    });
    return;
  }

  try {
    const payload = verifyToken(token);

    req.userId = payload.userId;

    next();
  } catch {
    res.status(401).json({
      message: "Token de autenticação inválido ou expirado.",
    });
  }
}