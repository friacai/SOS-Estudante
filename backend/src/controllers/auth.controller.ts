import type { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service.js";

export async function register(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "Usuário criado com sucesso.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        timezone: user.timezone,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao criar usuário.";

    res.status(400).json({
      message,
    });
  }
}

export async function login(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { email, password } = req.body;

    const { token, user } = await loginUser({
      email,
      password,
    });

    res.status(200).json({
      message: "Login realizado com sucesso.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        timezone: user.timezone,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao realizar login.";

    res.status(401).json({
      message,
    });
  }
}