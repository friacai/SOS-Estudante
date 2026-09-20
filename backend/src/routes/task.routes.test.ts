import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

process.env.JWT_SECRET = "test-secret-sos-estudante";

const createTaskMock = vi.fn();
const listTasksMock = vi.fn();
const getTaskByIdMock = vi.fn();
const updateTaskMock = vi.fn();
const deleteTaskMock = vi.fn();

vi.mock("../services/task.service.js", () => ({
  createTask: createTaskMock,
  listTasks: listTasksMock,
  getTaskById: getTaskByIdMock,
  updateTask: updateTaskMock,
  deleteTask: deleteTaskMock,
}));

describe("Task Routes", () => {
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

  describe("POST /api/v1/tasks", () => {
    it("deve criar uma tarefa autenticada", async () => {
      const token = generateToken("usuario-teste");

      const taskMock = {
        _id: "tarefa-1",
        userId: "usuario-teste",
        title: "Estudar Química",
        description: "Revisar ligações químicas",
        type: "task",
        status: "pending",
        difficulty: 4,
        complexity: 3,
        priority: "high",
        dueDate: null,
      };

      createTaskMock.mockResolvedValue(taskMock);

      const response = await request(app)
        .post("/api/v1/tasks")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Estudar Química",
          description: "Revisar ligações químicas",
          difficulty: 4,
          complexity: 3,
        });

      expect(response.status).toBe(201);

      expect(response.body).toEqual({
        message: "Tarefa criada com sucesso.",
        task: taskMock,
      });

      expect(createTaskMock).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: "usuario-teste",
          title: "Estudar Química",
          difficulty: 4,
          complexity: 3,
        }),
      );
    });

    it("deve retornar 401 sem token", async () => {
      const response = await request(app)
        .post("/api/v1/tasks")
        .send({
          title: "Estudar Química",
        });

      expect(response.status).toBe(401);

      expect(createTaskMock).not.toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/tasks", () => {
    it("deve listar as tarefas do usuário autenticado", async () => {
      const token = generateToken("usuario-teste");

      const tasksMock = [
        {
          _id: "tarefa-1",
          userId: "usuario-teste",
          title: "Estudar Química",
          priority: "high",
        },
      ];

      listTasksMock.mockResolvedValue(tasksMock);

      const response = await request(app)
        .get("/api/v1/tasks")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        tasks: tasksMock,
      });

      expect(listTasksMock).toHaveBeenCalledWith("usuario-teste");
    });

    it("deve retornar 401 sem token", async () => {
      const response = await request(app).get("/api/v1/tasks");

      expect(response.status).toBe(401);

      expect(listTasksMock).not.toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/tasks/:id", () => {
    it("deve retornar uma tarefa", async () => {
      const token = generateToken("usuario-teste");

      const taskMock = {
        _id: "tarefa-1",
        userId: "usuario-teste",
        title: "Estudar Física",
        priority: "medium",
      };

      getTaskByIdMock.mockResolvedValue(taskMock);

      const response = await request(app)
        .get("/api/v1/tasks/tarefa-1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        task: taskMock,
      });

      expect(getTaskByIdMock).toHaveBeenCalledWith(
        "usuario-teste",
        "tarefa-1",
      );
    });

    it("deve retornar 404 quando a tarefa não existir", async () => {
      const token = generateToken("usuario-teste");

      getTaskByIdMock.mockResolvedValue(null);

      const response = await request(app)
        .get("/api/v1/tasks/tarefa-inexistente")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);

      expect(response.body).toEqual({
        message: "Tarefa não encontrada.",
      });
    });
  });

  describe("PUT /api/v1/tasks/:id", () => {
    it("deve atualizar uma tarefa", async () => {
      const token = generateToken("usuario-teste");

      const taskMock = {
        _id: "tarefa-1",
        userId: "usuario-teste",
        title: "Estudar Química Orgânica",
        difficulty: 5,
        complexity: 4,
        priority: "high",
      };

      updateTaskMock.mockResolvedValue(taskMock);

      const response = await request(app)
        .put("/api/v1/tasks/tarefa-1")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Estudar Química Orgânica",
          difficulty: 5,
          complexity: 4,
        });

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        message: "Tarefa atualizada com sucesso.",
        task: taskMock,
      });

      expect(updateTaskMock).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: "usuario-teste",
          taskId: "tarefa-1",
          title: "Estudar Química Orgânica",
          difficulty: 5,
          complexity: 4,
        }),
      );
    });

    it("deve retornar 401 sem token", async () => {
      const response = await request(app)
        .put("/api/v1/tasks/tarefa-1")
        .send({
          title: "Nova tarefa",
        });

      expect(response.status).toBe(401);

      expect(updateTaskMock).not.toHaveBeenCalled();
    });
  });

  describe("DELETE /api/v1/tasks/:id", () => {
    it("deve excluir uma tarefa", async () => {
      const token = generateToken("usuario-teste");

      deleteTaskMock.mockResolvedValue(undefined);

      const response = await request(app)
        .delete("/api/v1/tasks/tarefa-1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        message: "Tarefa excluída com sucesso.",
      });

      expect(deleteTaskMock).toHaveBeenCalledWith(
        "usuario-teste",
        "tarefa-1",
      );
    });

    it("deve retornar 404 quando a tarefa não existir", async () => {
      const token = generateToken("usuario-teste");

      deleteTaskMock.mockRejectedValue(
        new Error("Tarefa não encontrada."),
      );

      const response = await request(app)
        .delete("/api/v1/tasks/tarefa-inexistente")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);

      expect(response.body).toEqual({
        message: "Tarefa não encontrada.",
      });
    });
  });
});