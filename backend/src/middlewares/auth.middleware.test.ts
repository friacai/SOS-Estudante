import { describe, expect, it, vi, beforeEach } from "vitest";
import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "./auth.middleware.js";

vi.mock("../services/jwt.service.js", () => ({
  verifyToken: vi.fn(),
}));

import { verifyToken } from "../services/jwt.service.js";
import { authenticate } from "./auth.middleware.js";

describe("Auth Middleware", () => {
  const next = vi.fn() as NextFunction;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  function createResponse() {
    return {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as unknown as Response;
  }

  it("deve rejeitar requisição sem header Authorization", () => {
    const req = {
      headers: {},
    } as AuthenticatedRequest;

    const res = createResponse();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "Token de autenticação não fornecido.",
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("deve rejeitar Authorization sem Bearer", () => {
    const req = {
      headers: {
        authorization: "Basic token-teste",
      },
    } as AuthenticatedRequest;

    const res = createResponse();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "Token de autenticação não fornecido.",
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("deve rejeitar Bearer sem token", () => {
    const req = {
      headers: {
        authorization: "Bearer ",
      },
    } as AuthenticatedRequest;

    const res = createResponse();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "Token de autenticação não fornecido.",
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("deve rejeitar token inválido", () => {
    vi.mocked(verifyToken).mockImplementation(() => {
      throw new Error("Token inválido.");
    });

    const req = {
      headers: {
        authorization: "Bearer token-invalido",
      },
    } as AuthenticatedRequest;

    const res = createResponse();

    authenticate(req, res, next);

    expect(verifyToken).toHaveBeenCalledWith("token-invalido");

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "Token de autenticação inválido ou expirado.",
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("deve aceitar token válido e definir o userId", () => {
    vi.mocked(verifyToken).mockReturnValue({
      userId: "usuario-teste",
    });

    const req = {
      headers: {
        authorization: "Bearer token-valido",
      },
    } as AuthenticatedRequest;

    const res = createResponse();

    authenticate(req, res, next);

    expect(verifyToken).toHaveBeenCalledWith("token-valido");

    expect(req.userId).toBe("usuario-teste");

    expect(next).toHaveBeenCalledTimes(1);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("deve extrair corretamente o token depois de Bearer", () => {
    vi.mocked(verifyToken).mockReturnValue({
      userId: "usuario-teste",
    });

    const req = {
      headers: {
        authorization: "Bearer   token-valido   ",
      },
    } as AuthenticatedRequest;

    const res = createResponse();

    authenticate(req, res, next);

    expect(verifyToken).toHaveBeenCalledWith("token-valido");

    expect(req.userId).toBe("usuario-teste");
    expect(next).toHaveBeenCalledTimes(1);
  });
});