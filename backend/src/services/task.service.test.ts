import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("../models/User.js", () => ({
  UserModel: {
    findById: vi.fn(),
  },
}));

vi.mock("../models/Subject.js", () => ({
  SubjectModel: {
    findOne: vi.fn(),
  },
}));

vi.mock("../models/Task.js", () => ({
  TaskModel: {
    create: vi.fn(),
    findOne: vi.fn(),
    findOneAndUpdate: vi.fn(),
    findOneAndDelete: vi.fn(),
  },
}));

import { UserModel } from "../models/User.js";
import { SubjectModel } from "../models/Subject.js";
import { TaskModel } from "../models/Task.js";
import {
  createTask,
  updateTask,
  deleteTask,
} from "./task.service.js";

describe("Task Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createTask", () => {
   it("deve permitir criar tarefa com matéria pertencente ao usuário", async () => {
  vi.mocked(UserModel.findById).mockResolvedValue({
    preferences: {
      priorityMode: "balanced",
    },
  } as any);

  vi.mocked(SubjectModel.findOne).mockResolvedValue({
    _id: "materia-teste",
    userId: "usuario-teste",
    name: "Química",
  } as any);

  vi.mocked(TaskModel.create).mockResolvedValue({
    title: "Estudar Química",
    subjectId: "materia-teste",
    difficulty: 3,
    complexity: 3,
    priority: "medium",
  } as any);

  await createTask({
    userId: "usuario-teste",
    title: "Estudar Química",
    subjectId: "materia-teste",
  });

  expect(SubjectModel.findOne).toHaveBeenCalledWith({
    _id: "materia-teste",
    userId: "usuario-teste",
  });

  expect(TaskModel.create).toHaveBeenCalled();
});

it("deve rejeitar criação com matéria que não pertence ao usuário", async () => {
  vi.mocked(UserModel.findById).mockResolvedValue({
    preferences: {
      priorityMode: "balanced",
    },
  } as any);

  vi.mocked(SubjectModel.findOne).mockResolvedValue(null);

  await expect(
    createTask({
      userId: "usuario-teste",
      title: "Estudar Química",
      subjectId: "materia-de-outro-usuario",
    }),
  ).rejects.toThrow("Matéria não encontrada.");

  expect(SubjectModel.findOne).toHaveBeenCalledWith({
    _id: "materia-de-outro-usuario",
    userId: "usuario-teste",
  });

  expect(TaskModel.create).not.toHaveBeenCalled();
});

    it("deve calcular a prioridade automaticamente ao criar uma tarefa", async () => {
      vi.mocked(UserModel.findById).mockResolvedValue({
        preferences: {
          priorityMode: "difficulty",
        },
      } as any);

      vi.mocked(TaskModel.create).mockResolvedValue({
        title: "Estudar Química",
        difficulty: 5,
        complexity: 1,
        priority: "high",
      } as any);

      const task = await createTask({
        userId: "usuario-teste",
        title: "Estudar Química",
        difficulty: 5,
        complexity: 1,
        dueDate: new Date("2026-09-20T12:00:00.000Z"),
      });

      expect(TaskModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: "usuario-teste",
          title: "Estudar Química",
          difficulty: 5,
          complexity: 1,
          priority: "high",
        }),
      );

      expect(task.priority).toBe("high");
    });

    it("deve utilizar valores padrão quando dificuldade e complexidade não forem informadas", async () => {
      vi.mocked(UserModel.findById).mockResolvedValue({
        preferences: {
          priorityMode: "balanced",
        },
      } as any);

      vi.mocked(TaskModel.create).mockResolvedValue({
        title: "Estudar",
        difficulty: 3,
        complexity: 3,
        priority: "medium",
      } as any);

      await createTask({
        userId: "usuario-teste",
        title: "Estudar",
      });

      expect(TaskModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          difficulty: 3,
          complexity: 3,
          dueDate: null,
        }),
      );
    });

    it("deve rejeitar título muito curto", async () => {
      await expect(
        createTask({
          userId: "usuario-teste",
          title: "A",
        }),
      ).rejects.toThrow(
        "O título da tarefa deve ter pelo menos 2 caracteres.",
      );

      expect(UserModel.findById).not.toHaveBeenCalled();
      expect(TaskModel.create).not.toHaveBeenCalled();
    });

    it("deve rejeitar dificuldade menor que 1", async () => {
      await expect(
        createTask({
          userId: "usuario-teste",
          title: "Estudar",
          difficulty: 0,
        }),
      ).rejects.toThrow("A dificuldade deve estar entre 1 e 5.");

      expect(TaskModel.create).not.toHaveBeenCalled();
    });

    it("deve rejeitar dificuldade maior que 5", async () => {
      await expect(
        createTask({
          userId: "usuario-teste",
          title: "Estudar",
          difficulty: 6,
        }),
      ).rejects.toThrow("A dificuldade deve estar entre 1 e 5.");

      expect(TaskModel.create).not.toHaveBeenCalled();
    });

    it("deve rejeitar complexidade menor que 1", async () => {
      await expect(
        createTask({
          userId: "usuario-teste",
          title: "Estudar",
          complexity: 0,
        }),
      ).rejects.toThrow("A complexidade deve estar entre 1 e 5.");

      expect(TaskModel.create).not.toHaveBeenCalled();
    });

    it("deve rejeitar complexidade maior que 5", async () => {
      await expect(
        createTask({
          userId: "usuario-teste",
          title: "Estudar",
          complexity: 6,
        }),
      ).rejects.toThrow("A complexidade deve estar entre 1 e 5.");

      expect(TaskModel.create).not.toHaveBeenCalled();
    });

    it("deve rejeitar criação quando o usuário não existir", async () => {
      vi.mocked(UserModel.findById).mockResolvedValue(null);

      await expect(
        createTask({
          userId: "usuario-inexistente",
          title: "Estudar",
        }),
      ).rejects.toThrow("Usuário não encontrado.");

      expect(TaskModel.create).not.toHaveBeenCalled();
    });
  });

  describe("updateTask", () => {
it("deve permitir remover a matéria de uma tarefa", async () => {
  vi.mocked(TaskModel.findOne).mockResolvedValue({
    _id: "tarefa-teste",
    userId: "usuario-teste",
    difficulty: 3,
    complexity: 3,
    dueDate: null,
    subjectId: "materia-teste",
  } as any);

  vi.mocked(UserModel.findById).mockResolvedValue({
    preferences: {
      priorityMode: "balanced",
    },
  } as any);

  vi.mocked(TaskModel.findOneAndUpdate).mockResolvedValue({
    _id: "tarefa-teste",
    userId: "usuario-teste",
    subjectId: null,
    difficulty: 3,
    complexity: 3,
    priority: "low",
  } as any);

  const task = await updateTask({
    userId: "usuario-teste",
    taskId: "tarefa-teste",
    subjectId: null,
  });

  expect(SubjectModel.findOne).not.toHaveBeenCalled();

  expect(TaskModel.findOneAndUpdate).toHaveBeenCalledWith(
    {
      _id: "tarefa-teste",
      userId: "usuario-teste",
    },
    {
      $set: expect.objectContaining({
        subjectId: null,
        priority: "low",
      }),
    },
    {
      new: true,
      runValidators: true,
    },
  );

  expect(task.subjectId).toBeNull();
});
    it("deve rejeitar atualização com matéria que não pertence ao usuário", async () => {
  vi.mocked(TaskModel.findOne).mockResolvedValue({
    _id: "tarefa-teste",
    userId: "usuario-teste",
    difficulty: 3,
    complexity: 3,
    dueDate: null,
  } as any);

  vi.mocked(SubjectModel.findOne).mockResolvedValue(null);

  await expect(
    updateTask({
      userId: "usuario-teste",
      taskId: "tarefa-teste",
      subjectId: "materia-de-outro-usuario",
    }),
  ).rejects.toThrow("Matéria não encontrada.");

  expect(SubjectModel.findOne).toHaveBeenCalledWith({
    _id: "materia-de-outro-usuario",
    userId: "usuario-teste",
  });

  expect(TaskModel.findOneAndUpdate).not.toHaveBeenCalled();
});

    it("deve recalcular a prioridade ao atualizar uma tarefa", async () => {
      vi.mocked(UserModel.findById).mockResolvedValue({
        preferences: {
          priorityMode: "difficulty",
        },
      } as any);

      vi.mocked(TaskModel.findOne).mockResolvedValue({
        _id: "tarefa-teste",
        userId: "usuario-teste",
        title: "Estudar Química",
        difficulty: 5,
        complexity: 1,
        dueDate: new Date("2026-09-05T12:00:00.000Z"),
      } as any);

      vi.mocked(TaskModel.findOneAndUpdate).mockResolvedValue({
        _id: "tarefa-teste",
        difficulty: 1,
        complexity: 5,
        priority: "medium",
      } as any);

      const task = await updateTask({
        userId: "usuario-teste",
        taskId: "tarefa-teste",
        difficulty: 1,
        complexity: 5,
      });

      expect(TaskModel.findOneAndUpdate).toHaveBeenCalledWith(
        {
          _id: "tarefa-teste",
          userId: "usuario-teste",
        },
        {
          $set: expect.objectContaining({
            difficulty: 1,
            complexity: 5,
            priority: "medium",
          }),
        },
        {
          new: true,
          runValidators: true,
        },
      );

      expect(task.priority).toBe("medium");
    });

    it("deve recalcular a prioridade quando o prazo for alterado", async () => {
      vi.mocked(UserModel.findById).mockResolvedValue({
        preferences: {
          priorityMode: "deadline",
        },
      } as any);

      vi.mocked(TaskModel.findOne).mockResolvedValue({
        _id: "tarefa-teste",
        userId: "usuario-teste",
        title: "Estudar para a prova",
        difficulty: 1,
        complexity: 1,
        dueDate: new Date("2026-09-20T12:00:00.000Z"),
      } as any);

      vi.mocked(TaskModel.findOneAndUpdate).mockResolvedValue({
        _id: "tarefa-teste",
        dueDate: new Date("2026-09-07T12:00:00.000Z"),
        priority: "high",
      } as any);

      const task = await updateTask({
        userId: "usuario-teste",
        taskId: "tarefa-teste",
        dueDate: new Date("2026-09-07T12:00:00.000Z"),
      });

      expect(TaskModel.findOneAndUpdate).toHaveBeenCalledWith(
        {
          _id: "tarefa-teste",
          userId: "usuario-teste",
        },
        {
          $set: expect.objectContaining({
            dueDate: new Date("2026-09-07T12:00:00.000Z"),
            priority: "high",
          }),
        },
        {
          new: true,
          runValidators: true,
        },
      );

      expect(task.priority).toBe("high");
    });

    it("deve rejeitar atualização quando a tarefa não existir", async () => {
      vi.mocked(TaskModel.findOne).mockResolvedValue(null);

      await expect(
        updateTask({
          userId: "usuario-teste",
          taskId: "tarefa-inexistente",
          difficulty: 5,
        }),
      ).rejects.toThrow("Tarefa não encontrada.");

      expect(UserModel.findById).not.toHaveBeenCalled();
      expect(TaskModel.findOneAndUpdate).not.toHaveBeenCalled();
    });

    it("deve atualizar completedAt quando a tarefa for concluída", async () => {
      vi.mocked(TaskModel.findOne).mockResolvedValue({
        _id: "tarefa-teste",
        userId: "usuario-teste",
        difficulty: 3,
        complexity: 3,
        dueDate: null,
      } as any);

      vi.mocked(UserModel.findById).mockResolvedValue({
        preferences: {
          priorityMode: "balanced",
        },
      } as any);

      vi.mocked(TaskModel.findOneAndUpdate).mockResolvedValue({
        _id: "tarefa-teste",
        status: "completed",
        completedAt: new Date(),
        priority: "medium",
      } as any);

      await updateTask({
        userId: "usuario-teste",
        taskId: "tarefa-teste",
        status: "completed",
      });

      expect(TaskModel.findOneAndUpdate).toHaveBeenCalledWith(
        {
          _id: "tarefa-teste",
          userId: "usuario-teste",
        },
        {
          $set: expect.objectContaining({
            status: "completed",
            completedAt: expect.any(Date),
          }),
        },
        {
          new: true,
          runValidators: true,
        },
      );
    });
  });

  describe("deleteTask", () => {
    it("deve excluir uma tarefa pertencente ao usuário", async () => {
      vi.mocked(TaskModel.findOneAndDelete).mockResolvedValue({
        _id: "tarefa-teste",
        userId: "usuario-teste",
      } as any);

      await deleteTask("usuario-teste", "tarefa-teste");

      expect(TaskModel.findOneAndDelete).toHaveBeenCalledWith({
        _id: "tarefa-teste",
        userId: "usuario-teste",
      });
    });

    it("deve rejeitar exclusão quando a tarefa não existir", async () => {
      vi.mocked(TaskModel.findOneAndDelete).mockResolvedValue(null);

      await expect(
        deleteTask("usuario-teste", "tarefa-inexistente"),
      ).rejects.toThrow("Tarefa não encontrada.");
    });
  });
});