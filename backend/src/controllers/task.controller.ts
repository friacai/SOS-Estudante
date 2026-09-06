import type { Response } from "express";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import {
  createTask,
  deleteTask,
  getTaskById,
  listTasks,
  updateTask,
} from "../services/task.service.js";

export async function create(
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> {
  try {
    if (!req.userId) {
      res.status(401).json({
        message: "Usuário não autenticado.",
      });
      return;
    }

    const {
      title,
      description,
      subjectId,
      type,
      status,
      difficulty,
      complexity,
      priority,
      dueDate,
    } = req.body;

    const task = await createTask({
      userId: req.userId,
      title,
      description,
      subjectId,
      type,
      status,
      difficulty,
      complexity,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
    });

    res.status(201).json({
      message: "Tarefa criada com sucesso.",
      task,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Erro ao criar tarefa.";

    res.status(400).json({
      message,
    });
  }
}

export async function list(
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> {
  try {
    if (!req.userId) {
      res.status(401).json({
        message: "Usuário não autenticado.",
      });
      return;
    }

    const tasks = await listTasks(req.userId);

    res.status(200).json({
      tasks,
    });
  } catch {
    res.status(500).json({
      message: "Erro ao buscar tarefas.",
    });
  }
}

export async function getById(
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> {
  try {
    if (!req.userId) {
      res.status(401).json({
        message: "Usuário não autenticado.",
      });
      return;
    }

    const taskId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const task = await getTaskById(
      req.userId,
      taskId,
    );

    if (!task) {
      res.status(404).json({
        message: "Tarefa não encontrada.",
      });
      return;
    }

    res.status(200).json({
      task,
    });
  } catch {
    res.status(500).json({
      message: "Erro ao buscar tarefa.",
    });
  }
}
export async function update(
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> {
  try {
    if (!req.userId) {
      res.status(401).json({
        message: "Usuário não autenticado.",
      });
      return;
    }

    const taskId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const {
      title,
      description,
      subjectId,
      type,
      status,
      difficulty,
      complexity,
      priority,
      dueDate,
    } = req.body;

    const task = await updateTask({
      userId: req.userId,
      taskId,
      title,
      description,
      subjectId,
      type,
      status,
      difficulty,
      complexity,
      priority,
      dueDate:
        dueDate === undefined
          ? undefined
          : dueDate === null
            ? null
            : new Date(dueDate),
    });

    res.status(200).json({
      message: "Tarefa atualizada com sucesso.",
      task,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Erro ao atualizar tarefa.";

    res.status(400).json({
      message,
    });
  }
}
export async function remove(
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> {
  try {
    if (!req.userId) {
      res.status(401).json({
        message: "Usuário não autenticado.",
      });
      return;
    }

    const taskId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    await deleteTask(req.userId, taskId);

    res.status(200).json({
      message: "Tarefa excluída com sucesso.",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Erro ao excluir tarefa.";

    res.status(404).json({
      message,
    });
  }
}