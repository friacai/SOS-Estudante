import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("../services/task.service.js", () => ({
  createTask: vi.fn(),
  listTasks: vi.fn(),
  getTaskById: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
}));

import {
  createTask,
  listTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../services/task.service.js";

import {
  create,
  list,
  getById,
  update,
  remove,
} from "./task.controller.js";

describe("Task Controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("create", () => {
    it("deve criar uma tarefa com usuário autenticado", async () => {
      vi.mocked(createTask).mockResolvedValue({
        _id: "tarefa-teste",
        title: "Estudar Química",
      } as any);

      const req = {
        userId: "usuario-teste",
        body: {
          title: "Estudar Química",
          description: "Revisar conteúdo",
          subjectId: "materia-teste",
          type: "task",
          status: "pending",
          difficulty: 4,
          complexity: 3,
          dueDate: "2026-09-20T12:00:00.000Z",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      } as any;

      await create(req, res);

      expect(createTask).toHaveBeenCalledWith({
        userId: "usuario-teste",
        title: "Estudar Química",
        description: "Revisar conteúdo",
        subjectId: "materia-teste",
        type: "task",
        status: "pending",
        difficulty: 4,
        complexity: 3,
        dueDate: new Date("2026-09-20T12:00:00.000Z"),
      });

      expect(res.status).toHaveBeenCalledWith(201);

      expect(res.json).toHaveBeenCalledWith({
        message: "Tarefa criada com sucesso.",
        task: {
          _id: "tarefa-teste",
          title: "Estudar Química",
        },
      });
    });

    it("deve retornar 401 quando não houver usuário autenticado", async () => {
      const req = {
        body: {
          title: "Estudar",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      } as any;

      await create(req, res);

      expect(res.status).toHaveBeenCalledWith(401);

      expect(res.json).toHaveBeenCalledWith({
        message: "Usuário não autenticado.",
      });

      expect(createTask).not.toHaveBeenCalled();
    });

    it("deve retornar 400 quando o service lançar erro", async () => {
      vi.mocked(createTask).mockRejectedValue(
        new Error("Matéria não encontrada."),
      );

      const req = {
        userId: "usuario-teste",
        body: {
          title: "Estudar Química",
          subjectId: "materia-inexistente",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      } as any;

      await create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        message: "Matéria não encontrada.",
      });
    });
  });

  describe("list", () => {
    it("deve listar as tarefas do usuário", async () => {
      vi.mocked(listTasks).mockResolvedValue([
        {
          _id: "tarefa-1",
          title: "Estudar Química",
        },
        {
          _id: "tarefa-2",
          title: "Fazer exercícios",
        },
      ] as any);

      const req = {
        userId: "usuario-teste",
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      } as any;

      await list(req, res);

      expect(listTasks).toHaveBeenCalledWith("usuario-teste");

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        tasks: [
          {
            _id: "tarefa-1",
            title: "Estudar Química",
          },
          {
            _id: "tarefa-2",
            title: "Fazer exercícios",
          },
        ],
      });
    });

    it("deve retornar 401 quando não houver usuário autenticado", async () => {
      const req = {} as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      } as any;

      await list(req, res);

      expect(res.status).toHaveBeenCalledWith(401);

      expect(listTasks).not.toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("deve retornar uma tarefa existente", async () => {
      vi.mocked(getTaskById).mockResolvedValue({
        _id: "tarefa-teste",
        title: "Estudar Química",
      } as any);

      const req = {
        userId: "usuario-teste",
        params: {
          id: "tarefa-teste",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      } as any;

      await getById(req, res);

      expect(getTaskById).toHaveBeenCalledWith(
        "usuario-teste",
        "tarefa-teste",
      );

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        task: {
          _id: "tarefa-teste",
          title: "Estudar Química",
        },
      });
    });

    it("deve retornar 404 quando a tarefa não existir", async () => {
      vi.mocked(getTaskById).mockResolvedValue(null);

      const req = {
        userId: "usuario-teste",
        params: {
          id: "tarefa-inexistente",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      } as any;

      await getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);

      expect(res.json).toHaveBeenCalledWith({
        message: "Tarefa não encontrada.",
      });
    });
  });

  describe("update", () => {
    it("deve atualizar uma tarefa", async () => {
      vi.mocked(updateTask).mockResolvedValue({
        _id: "tarefa-teste",
        title: "Estudar Física",
      } as any);

      const req = {
        userId: "usuario-teste",
        params: {
          id: "tarefa-teste",
        },
        body: {
          title: "Estudar Física",
          difficulty: 5,
          dueDate: "2026-09-25T12:00:00.000Z",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      } as any;

      await update(req, res);

      expect(updateTask).toHaveBeenCalledWith({
        userId: "usuario-teste",
        taskId: "tarefa-teste",
        title: "Estudar Física",
        description: undefined,
        subjectId: undefined,
        type: undefined,
        status: undefined,
        difficulty: 5,
        complexity: undefined,
        dueDate: new Date("2026-09-25T12:00:00.000Z"),
      });

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        message: "Tarefa atualizada com sucesso.",
        task: {
          _id: "tarefa-teste",
          title: "Estudar Física",
        },
      });
    });

    it("deve permitir remover a matéria enviando subjectId null", async () => {
      vi.mocked(updateTask).mockResolvedValue({
        _id: "tarefa-teste",
        subjectId: null,
      } as any);

      const req = {
        userId: "usuario-teste",
        params: {
          id: "tarefa-teste",
        },
        body: {
          subjectId: null,
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      } as any;

      await update(req, res);

      expect(updateTask).toHaveBeenCalledWith({
        userId: "usuario-teste",
        taskId: "tarefa-teste",
        title: undefined,
        description: undefined,
        subjectId: null,
        type: undefined,
        status: undefined,
        difficulty: undefined,
        complexity: undefined,
        dueDate: undefined,
      });

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("deve retornar 400 quando o service lançar erro", async () => {
      vi.mocked(updateTask).mockRejectedValue(
        new Error("Tarefa não encontrada."),
      );

      const req = {
        userId: "usuario-teste",
        params: {
          id: "tarefa-inexistente",
        },
        body: {
          title: "Estudar",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      } as any;

      await update(req, res);

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        message: "Tarefa não encontrada.",
      });
    });
  });

  describe("remove", () => {
    it("deve excluir uma tarefa", async () => {
      vi.mocked(deleteTask).mockResolvedValue(undefined);

      const req = {
        userId: "usuario-teste",
        params: {
          id: "tarefa-teste",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      } as any;

      await remove(req, res);

      expect(deleteTask).toHaveBeenCalledWith(
        "usuario-teste",
        "tarefa-teste",
      );

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        message: "Tarefa excluída com sucesso.",
      });
    });

    it("deve retornar 404 quando a tarefa não existir", async () => {
      vi.mocked(deleteTask).mockRejectedValue(
        new Error("Tarefa não encontrada."),
      );

      const req = {
        userId: "usuario-teste",
        params: {
          id: "tarefa-inexistente",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      } as any;

      await remove(req, res);

      expect(res.status).toHaveBeenCalledWith(404);

      expect(res.json).toHaveBeenCalledWith({
        message: "Tarefa não encontrada.",
      });
    });

    it("deve retornar 401 quando não houver usuário autenticado", async () => {
      const req = {
        params: {
          id: "tarefa-teste",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      } as any;

      await remove(req, res);

      expect(res.status).toHaveBeenCalledWith(401);

      expect(deleteTask).not.toHaveBeenCalled();
    });
  });
});