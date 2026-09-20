import { beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

let app: typeof import("./app.js").default;

beforeAll(async () => {
  process.env.JWT_SECRET = "test-secret-sos-estudante";

  const module = await import("./app.js");
  app = module.default;
});

describe("App", () => {
  describe("GET /health", () => {
    it("deve retornar status 200 e confirmar que a API está funcionando", async () => {
      const response = await request(app).get("/health");

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        status: "ok",
        message: "SOS Estudante API funcionando",
      });
    });
  });

  describe("Rotas protegidas", () => {
    it("deve rejeitar acesso a /api/v1/users/me sem token", async () => {
      const response = await request(app).get("/api/v1/users/me");

      expect(response.status).toBe(401);

      expect(response.body).toEqual({
        message: "Token de autenticação não fornecido.",
      });
    });

    it("deve rejeitar acesso a /api/v1/tasks sem token", async () => {
      const response = await request(app).get("/api/v1/tasks");

      expect(response.status).toBe(401);

      expect(response.body).toEqual({
        message: "Token de autenticação não fornecido.",
      });
    });

    it("deve rejeitar acesso a /api/v1/subjects sem token", async () => {
      const response = await request(app).get("/api/v1/subjects");

      expect(response.status).toBe(401);

      expect(response.body).toEqual({
        message: "Token de autenticação não fornecido.",
      });
    });
  });

  describe("Rotas de autenticação", () => {
    it("deve rejeitar registro com dados inválidos", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    });

    it("deve rejeitar login com dados inválidos", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({});

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
  });

  describe("Rotas inexistentes", () => {
    it("deve retornar 404 para uma rota inexistente", async () => {
      const response = await request(app).get("/api/v1/rota-inexistente");

      expect(response.status).toBe(404);
    });
  });
});