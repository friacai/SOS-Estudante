import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

process.env.JWT_SECRET = "test-secret-sos-estudante";

vi.mock("../services/auth.service.js", () => ({
  registerUser: vi.fn(),
  loginUser: vi.fn(),
}));

describe("Auth Routes", () => {
  let app: any;
  let registerUser: any;
  let loginUser: any;

  beforeAll(async () => {
    const authService = await import("../services/auth.service.js");
    const appModule = await import("../app.js");

    registerUser = authService.registerUser;
    loginUser = authService.loginUser;
    app = appModule.default;
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("POST /api/v1/auth/register", () => {
    it("deve registrar um usuário com sucesso", async () => {
      vi.mocked(registerUser).mockResolvedValue({
        _id: "usuario-teste",
        name: "Usuário Teste",
        email: "teste@email.com",
        role: "student",
        timezone: "America/Sao_Paulo",
      });

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
          name: "Usuário Teste",
          email: "teste@email.com",
          password: "senha123",
        });

      expect(response.status).toBe(201);

      expect(response.body).toEqual({
        message: "Usuário criado com sucesso.",
        user: {
          id: "usuario-teste",
          name: "Usuário Teste",
          email: "teste@email.com",
          role: "student",
          timezone: "America/Sao_Paulo",
        },
      });

      expect(registerUser).toHaveBeenCalledWith({
        name: "Usuário Teste",
        email: "teste@email.com",
        password: "senha123",
      });
    });

    it("deve retornar 400 quando o cadastro falhar", async () => {
      vi.mocked(registerUser).mockRejectedValue(
        new Error("Email já cadastrado."),
      );

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
          name: "Usuário Teste",
          email: "teste@email.com",
          password: "senha123",
        });

      expect(response.status).toBe(400);

      expect(response.body).toEqual({
        message: "Email já cadastrado.",
      });
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("deve realizar login com sucesso", async () => {
      vi.mocked(loginUser).mockResolvedValue({
        token: "token-de-teste",
        user: {
          _id: "usuario-teste",
          name: "Usuário Teste",
          email: "teste@email.com",
          role: "student",
          timezone: "America/Sao_Paulo",
        },
      });

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "teste@email.com",
          password: "senha123",
        });

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        message: "Login realizado com sucesso.",
        token: "token-de-teste",
        user: {
          id: "usuario-teste",
          name: "Usuário Teste",
          email: "teste@email.com",
          role: "student",
          timezone: "America/Sao_Paulo",
        },
      });

      expect(loginUser).toHaveBeenCalledWith({
        email: "teste@email.com",
        password: "senha123",
      });
    });

    it("deve retornar 401 quando o login falhar", async () => {
      vi.mocked(loginUser).mockRejectedValue(
        new Error("Email ou senha inválidos."),
      );

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "teste@email.com",
          password: "senha-errada",
        });

      expect(response.status).toBe(401);

      expect(response.body).toEqual({
        message: "Email ou senha inválidos.",
      });
    });
  });
});