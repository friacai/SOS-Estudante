import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Response } from "express";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js";

vi.mock("../models/User.js", () => ({
  UserModel: {
    findById: vi.fn(),
    findByIdAndUpdate: vi.fn(),
  },
}));

import { UserModel } from "../models/User.js";
import {
  getMe,
  updatePreferences,
} from "./user.controller.js";

describe("User Controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function createResponse() {
    return {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as unknown as Response;
  }

  describe("getMe", () => {
    it("deve rejeitar requisição sem usuário autenticado", async () => {
      const req = {
        userId: undefined,
      } as AuthenticatedRequest;

      const res = createResponse();

      await getMe(req, res);

      expect(res.status).toHaveBeenCalledWith(401);

      expect(res.json).toHaveBeenCalledWith({
        message: "Usuário não autenticado.",
      });

      expect(UserModel.findById).not.toHaveBeenCalled();
    });

    it("deve retornar os dados do usuário autenticado", async () => {
      const user = {
        _id: "usuario-123",
        name: "João",
        email: "joao@email.com",
        avatar: "avatar.png",
        bio: "Estudante",
        role: "student",
        timezone: "America/Sao_Paulo",
        preferences: {
          priorityMode: "balanced",
        },
        createdAt: new Date("2026-01-01"),
      };

      const select = vi.fn().mockResolvedValue(user);

      vi.mocked(UserModel.findById).mockReturnValue({
        select,
      } as never);

      const req = {
        userId: "usuario-123",
      } as AuthenticatedRequest;

      const res = createResponse();

      await getMe(req, res);

      expect(UserModel.findById).toHaveBeenCalledWith(
        "usuario-123",
      );

      expect(select).toHaveBeenCalledWith("-passwordHash");

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        user: {
          id: "usuario-123",
          name: "João",
          email: "joao@email.com",
          avatar: "avatar.png",
          bio: "Estudante",
          role: "student",
          timezone: "America/Sao_Paulo",
          preferences: {
            priorityMode: "balanced",
          },
          createdAt: user.createdAt,
        },
      });
    });

    it("não deve retornar usuário inexistente", async () => {
      const select = vi.fn().mockResolvedValue(null);

      vi.mocked(UserModel.findById).mockReturnValue({
        select,
      } as never);

      const req = {
        userId: "usuario-inexistente",
      } as AuthenticatedRequest;

      const res = createResponse();

      await getMe(req, res);

      expect(res.status).toHaveBeenCalledWith(404);

      expect(res.json).toHaveBeenCalledWith({
        message: "Usuário não encontrado.",
      });
    });

    it("deve retornar 500 quando ocorrer erro ao buscar usuário", async () => {
      const select = vi.fn().mockRejectedValue(
        new Error("Erro no banco"),
      );

      vi.mocked(UserModel.findById).mockReturnValue({
        select,
      } as never);

      const req = {
        userId: "usuario-123",
      } as AuthenticatedRequest;

      const res = createResponse();

      await getMe(req, res);

      expect(res.status).toHaveBeenCalledWith(500);

      expect(res.json).toHaveBeenCalledWith({
        message: "Erro ao buscar usuário.",
      });
    });

    it("não deve expor passwordHash na resposta", async () => {
      const user = {
        _id: "usuario-123",
        name: "João",
        email: "joao@email.com",
        passwordHash: "hash-super-secreto",
        avatar: null,
        bio: null,
        role: "student",
        timezone: "America/Sao_Paulo",
        preferences: {
          priorityMode: "balanced",
        },
        createdAt: new Date("2026-01-01"),
      };

      const select = vi.fn().mockResolvedValue(user);

      vi.mocked(UserModel.findById).mockReturnValue({
        select,
      } as never);

      const req = {
        userId: "usuario-123",
      } as AuthenticatedRequest;

      const res = createResponse();

      await getMe(req, res);

      const response = vi.mocked(res.json).mock.calls[0][0];

      expect(response.user).not.toHaveProperty("passwordHash");
      expect(response.user).not.toHaveProperty("password");
    });
  });

  describe("updatePreferences", () => {
    it("deve rejeitar requisição sem usuário autenticado", async () => {
      const req = {
        userId: undefined,
        body: {
          priorityMode: "balanced",
        },
      } as AuthenticatedRequest;

      const res = createResponse();

      await updatePreferences(req, res);

      expect(res.status).toHaveBeenCalledWith(401);

      expect(res.json).toHaveBeenCalledWith({
        message: "Usuário não autenticado.",
      });

      expect(UserModel.findByIdAndUpdate).not.toHaveBeenCalled();
    });

    it("deve rejeitar modo de prioridade inválido", async () => {
      const req = {
        userId: "usuario-123",
        body: {
          priorityMode: "invalid",
        },
      } as AuthenticatedRequest;

      const res = createResponse();

      await updatePreferences(req, res);

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        message: "Modo de prioridade inválido.",
      });

      expect(UserModel.findByIdAndUpdate).not.toHaveBeenCalled();
    });

    it("deve aceitar modo deadline", async () => {
      const user = {
        _id: "usuario-123",
        name: "João",
        email: "joao@email.com",
        preferences: {
          priorityMode: "deadline",
        },
      };

      const select = vi.fn().mockResolvedValue(user);

      vi.mocked(UserModel.findByIdAndUpdate).mockReturnValue({
        select,
      } as never);

      const req = {
        userId: "usuario-123",
        body: {
          priorityMode: "deadline",
        },
      } as AuthenticatedRequest;

      const res = createResponse();

      await updatePreferences(req, res);

      expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(
        "usuario-123",
        {
          $set: {
            "preferences.priorityMode": "deadline",
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("deve aceitar todos os modos de prioridade válidos", async () => {
      const modes = [
        "deadline",
        "difficulty",
        "complexity",
        "balanced",
      ];

      for (const mode of modes) {
        vi.clearAllMocks();

        const user = {
          _id: "usuario-123",
          name: "João",
          email: "joao@email.com",
          preferences: {
            priorityMode: mode,
          },
        };

        const select = vi.fn().mockResolvedValue(user);

        vi.mocked(UserModel.findByIdAndUpdate).mockReturnValue({
          select,
        } as never);

        const req = {
          userId: "usuario-123",
          body: {
            priorityMode: mode,
          },
        } as AuthenticatedRequest;

        const res = createResponse();

        await updatePreferences(req, res);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(
          "usuario-123",
          {
            $set: {
              "preferences.priorityMode": mode,
            },
          },
          {
            new: true,
            runValidators: true,
          },
        );
      }
    });

    it("deve retornar 404 quando o usuário não existir", async () => {
      const select = vi.fn().mockResolvedValue(null);

      vi.mocked(UserModel.findByIdAndUpdate).mockReturnValue({
        select,
      } as never);

      const req = {
        userId: "usuario-inexistente",
        body: {
          priorityMode: "balanced",
        },
      } as AuthenticatedRequest;

      const res = createResponse();

      await updatePreferences(req, res);

      expect(res.status).toHaveBeenCalledWith(404);

      expect(res.json).toHaveBeenCalledWith({
        message: "Usuário não encontrado.",
      });
    });

    it("deve retornar 500 quando ocorrer erro ao atualizar preferências", async () => {
      const select = vi.fn().mockRejectedValue(
        new Error("Erro no banco"),
      );

      vi.mocked(UserModel.findByIdAndUpdate).mockReturnValue({
        select,
      } as never);

      const req = {
        userId: "usuario-123",
        body: {
          priorityMode: "balanced",
        },
      } as AuthenticatedRequest;

      const res = createResponse();

      await updatePreferences(req, res);

      expect(res.status).toHaveBeenCalledWith(500);

      expect(res.json).toHaveBeenCalledWith({
        message: "Erro ao atualizar preferências.",
      });
    });

    it("não deve expor passwordHash ao atualizar preferências", async () => {
      const user = {
        _id: "usuario-123",
        name: "João",
        email: "joao@email.com",
        passwordHash: "hash-super-secreto",
        preferences: {
          priorityMode: "balanced",
        },
      };

      const select = vi.fn().mockResolvedValue(user);

      vi.mocked(UserModel.findByIdAndUpdate).mockReturnValue({
        select,
      } as never);

      const req = {
        userId: "usuario-123",
        body: {
          priorityMode: "balanced",
        },
      } as AuthenticatedRequest;

      const res = createResponse();

      await updatePreferences(req, res);

      const response = vi.mocked(res.json).mock.calls[0][0];

      expect(response.user).not.toHaveProperty("passwordHash");
      expect(response.user).not.toHaveProperty("password");
    });
  });
});