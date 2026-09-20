import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Request, Response } from "express";

vi.mock("../services/auth.service.js", () => ({
  registerUser: vi.fn(),
  loginUser: vi.fn(),
}));

import {
  loginUser,
  registerUser,
} from "../services/auth.service.js";

import {
  login,
  register,
} from "./auth.controller.js";

describe("Auth Controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function createResponse() {
    return {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as unknown as Response;
  }

  describe("register", () => {
    it("deve registrar usuário com sucesso", async () => {
      vi.mocked(registerUser).mockResolvedValue({
        _id: "usuario-123",
        name: "João",
        email: "joao@email.com",
        role: "student",
        timezone: "America/Sao_Paulo",
      } as never);

      const req = {
        body: {
          name: "João",
          email: "joao@email.com",
          password: "senha123",
        },
      } as Request;

      const res = createResponse();

      await register(req, res);

      expect(registerUser).toHaveBeenCalledWith({
        name: "João",
        email: "joao@email.com",
        password: "senha123",
      });

      expect(res.status).toHaveBeenCalledWith(201);

      expect(res.json).toHaveBeenCalledWith({
        message: "Usuário criado com sucesso.",
        user: {
          id: "usuario-123",
          name: "João",
          email: "joao@email.com",
          role: "student",
          timezone: "America/Sao_Paulo",
        },
      });
    });

    it("não deve expor o passwordHash na resposta", async () => {
      vi.mocked(registerUser).mockResolvedValue({
        _id: "usuario-123",
        name: "João",
        email: "joao@email.com",
        role: "student",
        timezone: "America/Sao_Paulo",
        passwordHash: "hash-super-secreto",
      } as never);

      const req = {
        body: {
          name: "João",
          email: "joao@email.com",
          password: "senha123",
        },
      } as Request;

      const res = createResponse();

      await register(req, res);

      const response = vi.mocked(res.json).mock.calls[0][0];

      expect(response.user).not.toHaveProperty("passwordHash");
      expect(response.user).not.toHaveProperty("password");
    });

    it("deve retornar 400 quando o cadastro falhar", async () => {
      vi.mocked(registerUser).mockRejectedValue(
        new Error("Email já cadastrado."),
      );

      const req = {
        body: {
          name: "João",
          email: "joao@email.com",
          password: "senha123",
        },
      } as Request;

      const res = createResponse();

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        message: "Email já cadastrado.",
      });
    });

    it("deve usar mensagem genérica quando o erro não for uma instância de Error", async () => {
      vi.mocked(registerUser).mockRejectedValue("erro desconhecido");

      const req = {
        body: {},
      } as Request;

      const res = createResponse();

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        message: "Erro ao criar usuário.",
      });
    });
  });

  describe("login", () => {
    it("deve realizar login com sucesso", async () => {
      vi.mocked(loginUser).mockResolvedValue({
        token: "token-jwt-teste",
        user: {
          _id: "usuario-123",
          name: "João",
          email: "joao@email.com",
          role: "student",
          timezone: "America/Sao_Paulo",
        },
      } as never);

      const req = {
        body: {
          email: "joao@email.com",
          password: "senha123",
        },
      } as Request;

      const res = createResponse();

      await login(req, res);

      expect(loginUser).toHaveBeenCalledWith({
        email: "joao@email.com",
        password: "senha123",
      });

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        message: "Login realizado com sucesso.",
        token: "token-jwt-teste",
        user: {
          id: "usuario-123",
          name: "João",
          email: "joao@email.com",
          role: "student",
          timezone: "America/Sao_Paulo",
        },
      });
    });

    it("deve retornar 401 quando o login falhar", async () => {
      vi.mocked(loginUser).mockRejectedValue(
        new Error("Email ou senha inválidos."),
      );

      const req = {
        body: {
          email: "joao@email.com",
          password: "senha-errada",
        },
      } as Request;

      const res = createResponse();

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);

      expect(res.json).toHaveBeenCalledWith({
        message: "Email ou senha inválidos.",
      });
    });

    it("deve usar mensagem genérica quando o erro não for uma instância de Error", async () => {
      vi.mocked(loginUser).mockRejectedValue("erro desconhecido");

      const req = {
        body: {},
      } as Request;

      const res = createResponse();

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);

      expect(res.json).toHaveBeenCalledWith({
        message: "Erro ao realizar login.",
      });
    });

    it("não deve expor o passwordHash no login", async () => {
      vi.mocked(loginUser).mockResolvedValue({
        token: "token-jwt-teste",
        user: {
          _id: "usuario-123",
          name: "João",
          email: "joao@email.com",
          role: "student",
          timezone: "America/Sao_Paulo",
          passwordHash: "hash-super-secreto",
        },
      } as never);

      const req = {
        body: {
          email: "joao@email.com",
          password: "senha123",
        },
      } as Request;

      const res = createResponse();

      await login(req, res);

      const response = vi.mocked(res.json).mock.calls[0][0];

      expect(response.user).not.toHaveProperty("passwordHash");
      expect(response.user).not.toHaveProperty("password");
    });
  });
});