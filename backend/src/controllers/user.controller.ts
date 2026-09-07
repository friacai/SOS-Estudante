import type { Request, Response } from "express";
import { UserModel } from "../models/User.js";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js";

export async function getMe(
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> {
  try {
    if (!req.userId) {
      res.status(401).json({
        message: "Usuário não autenticado.",
      });
      return;
    }

    const user = await UserModel.findById(req.userId).select("-passwordHash");

    if (!user) {
      res.status(404).json({
        message: "Usuário não encontrado.",
      });
      return;
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        role: user.role,
        timezone: user.timezone,
        preferences: user.preferences,
        createdAt: user.createdAt,
      },
    });
  } catch {
    res.status(500).json({
      message: "Erro ao buscar usuário.",
    });
  }
}

export async function updatePreferences(
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> {
  try {
    if (!req.userId) {
      res.status(401).json({
        message: "Usuário não autenticado.",
      });
      return;
    }

    const { priorityMode } = req.body;

    const validModes = [
      "deadline",
      "difficulty",
      "complexity",
      "balanced",
    ];

    if (!validModes.includes(priorityMode)) {
      res.status(400).json({
        message: "Modo de prioridade inválido.",
      });
      return;
    }

    const user = await UserModel.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          "preferences.priorityMode": priorityMode,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-passwordHash");

    if (!user) {
      res.status(404).json({
        message: "Usuário não encontrado.",
      });
      return;
    }

    res.status(200).json({
      message: "Preferências atualizadas com sucesso.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        preferences: user.preferences,
      },
    });
  } catch {
    res.status(500).json({
      message: "Erro ao atualizar preferências.",
    });
  }
}