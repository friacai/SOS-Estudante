import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não definida nas variáveis de ambiente.");
}

const SECRET: string = JWT_SECRET;

export interface JwtPayload {
  userId: string;
}

export function generateToken(userId: string): string {
  return jwt.sign(
    { userId },
    SECRET,
    {
      expiresIn: "15m",
    },
  );
}

export function verifyToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, SECRET);

  if (typeof decoded === "string" || !("userId" in decoded)) {
    throw new Error("Token JWT inválido.");
  }

  return {
    userId: String(decoded.userId),
  };
}