import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

process.env.JWT_SECRET = "test-secret-sos-estudante";

const { findByIdMock, findByIdAndUpdateMock } = vi.hoisted(() => ({
  findByIdMock: vi.fn(),
  findByIdAndUpdateMock: vi.fn(),
}));

vi.mock("../models/User.js", () => ({
  UserModel: {
    findById: findByIdMock,
    findByIdAndUpdate: findByIdAndUpdateMock,
  },
}));

describe("User Routes", () => {
  let app: any;
  let generateToken: any;

  beforeAll(async () => {
    const jwtService = await import("../services/jwt.service.js");
    const appModule = await import("../app.js");

    generateToken = jwtService.generateToken;
    app = appModule.default;
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET /api/v1/users/me", () => {
    it("deve retornar os dados do usuário autenticado", async () => {
      const token = generateToken("usuario-teste");

      const userMock = {
        _id: "usuario-teste",
        name: "Usuário Teste",
        email: "teste@email.com",
        avatar: null,
        bio: "Estudante",
        role: "student",
        timezone: "America/Sao_Paulo",
        preferences: {
          priorityMode: "balanced",
        },
        createdAt: new Date("2026-01-01T00:00:00.000Z"),
      };

      findByIdMock.mockReturnValue({
        select: vi.fn().mockResolvedValue(userMock),
      });

      const response = await request(app)
        .get("/api/v1/users/me")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        user: {
          id: "usuario-teste",
          name: "Usuário Teste",
          email: "teste@email.com",
          avatar: null,
          bio: "Estudante",
          role: "student",
          timezone: "America/Sao_Paulo",
          preferences: {
            priorityMode: "balanced",
          },
          createdAt: userMock.createdAt.toISOString(),
        },
      });

      expect(findByIdMock).toHaveBeenCalledWith("usuario-teste");
    });

    it("deve retornar 401 sem token", async () => {
      const response = await request(app).get("/api/v1/users/me");

      expect(response.status).toBe(401);

      expect(response.body).toEqual({
        message: "Token de autenticação não fornecido.",
      });
    });

    it("deve retornar 401 com token inválido", async () => {
      const response = await request(app)
        .get("/api/v1/users/me")
        .set("Authorization", "Bearer token-invalido");

      expect(response.status).toBe(401);

      expect(response.body).toEqual({
        message: "Token de autenticação inválido ou expirado.",
      });
    });

    it("deve retornar 404 quando o usuário não existir", async () => {
      const token = generateToken("usuario-inexistente");

      findByIdMock.mockReturnValue({
        select: vi.fn().mockResolvedValue(null),
      });

      const response = await request(app)
        .get("/api/v1/users/me")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);

      expect(response.body).toEqual({
        message: "Usuário não encontrado.",
      });
    });
  });

  describe("PUT /api/v1/users/me/preferences", () => {
    it("deve atualizar o modo de prioridade", async () => {
      const token = generateToken("usuario-teste");

      const userMock = {
        _id: "usuario-teste",
        name: "Usuário Teste",
        email: "teste@email.com",
        preferences: {
          priorityMode: "difficulty",
        },
      };

      findByIdAndUpdateMock.mockReturnValue({
        select: vi.fn().mockResolvedValue(userMock),
      });

      const response = await request(app)
        .put("/api/v1/users/me/preferences")
        .set("Authorization", `Bearer ${token}`)
        .send({
          priorityMode: "difficulty",
        });

      expect(response.status).toBe(200);

      expect(response.body.user.preferences.priorityMode).toBe(
        "difficulty",
      );

      expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
        "usuario-teste",
        {
          $set: {
            "preferences.priorityMode": "difficulty",
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );
    });

    it("deve rejeitar um modo de prioridade inválido", async () => {
      const token = generateToken("usuario-teste");

      const response = await request(app)
        .put("/api/v1/users/me/preferences")
        .set("Authorization", `Bearer ${token}`)
        .send({
          priorityMode: "modo-invalido",
        });

      expect(response.status).toBe(400);

      expect(response.body).toEqual({
        message: "Modo de prioridade inválido.",
      });

      expect(findByIdAndUpdateMock).not.toHaveBeenCalled();
    });

    it("deve retornar 401 sem token", async () => {
      const response = await request(app)
        .put("/api/v1/users/me/preferences")
        .send({
          priorityMode: "deadline",
        });

      expect(response.status).toBe(401);

      expect(response.body).toEqual({
        message: "Token de autenticação não fornecido.",
      });
    });
  });
});