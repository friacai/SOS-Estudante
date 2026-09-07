import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("../models/User.js", () => ({
  UserModel: {
    findById: vi.fn(),
  },
}));

vi.mock("../models/Task.js", () => ({
  TaskModel: {
    create: vi.fn(),
    findOne: vi.fn(),
    findOneAndUpdate: vi.fn(),
  },
}));

import { UserModel } from "../models/User.js";
import { TaskModel } from "../models/Task.js";
import { createTask, updateTask } from "./task.service.js";

describe("Task Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

    expect(TaskModel.create).toHaveBeenCalled();

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
      dueDate: new Date("2026-09-20T12:00:00.000Z"),
    } as any);

    vi.mocked(TaskModel.findOneAndUpdate).mockResolvedValue({
      _id: "tarefa-teste",
      userId: "usuario-teste",
      title: "Estudar Química",
      difficulty: 1,
      complexity: 5,
      dueDate: new Date("2026-09-20T12:00:00.000Z"),
      priority: "low",
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
          priority: "low",
        }),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    expect(task.priority).toBe("low");
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
      userId: "usuario-teste",
      title: "Estudar para a prova",
      difficulty: 1,
      complexity: 1,
      dueDate: new Date("2026-09-05T12:00:00.000Z"),
      priority: "high",
    } as any);

    const task = await updateTask({
      userId: "usuario-teste",
      taskId: "tarefa-teste",
      dueDate: new Date("2026-09-05T12:00:00.000Z"),
    });

    expect(TaskModel.findOneAndUpdate).toHaveBeenCalledWith(
      {
        _id: "tarefa-teste",
        userId: "usuario-teste",
      },
      {
        $set: expect.objectContaining({
          dueDate: new Date("2026-09-05T12:00:00.000Z"),
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
});

