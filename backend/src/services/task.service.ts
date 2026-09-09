import { TaskModel } from "../models/Task.js";
import { SubjectModel } from "../models/Subject.js";
import { calculatePriority } from "./priority.service.js";
import { UserModel } from "../models/User.js";

export interface CreateTaskData {
  userId: string;
  title: string;
  description?: string;
  subjectId?: string | null;
  type?: "task" | "work" | "assignment";
  status?: "pending" | "in_progress" | "completed";
  difficulty?: number;
  complexity?: number;
  dueDate?: Date | null;
}

export async function createTask(data: CreateTaskData) {
  const title = data.title.trim();

  if (title.length < 2) {
    throw new Error("O título da tarefa deve ter pelo menos 2 caracteres.");
  }

  if (data.difficulty !== undefined) {
    if (data.difficulty < 1 || data.difficulty > 5) {
      throw new Error("A dificuldade deve estar entre 1 e 5.");
    }
  }

  if (data.complexity !== undefined) {
    if (data.complexity < 1 || data.complexity > 5) {
      throw new Error("A complexidade deve estar entre 1 e 5.");
    }
  }

  const difficulty = data.difficulty ?? 3;
  const complexity = data.complexity ?? 3;
  const dueDate = data.dueDate ?? null;

  const user = await UserModel.findById(data.userId);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  if (data.subjectId) {
    const subject = await SubjectModel.findOne({
      _id: data.subjectId,
      userId: data.userId,
    });

    if (!subject) {
      throw new Error("Matéria não encontrada.");
    }
  }

  const priorityMode = user.preferences?.priorityMode ?? "balanced";

  const priorityResult = calculatePriority({
    dueDate,
    difficulty,
    complexity,
    mode: priorityMode,
  });

  return TaskModel.create({
    userId: data.userId,
    title,
    description: data.description?.trim() ?? "",
    subjectId: data.subjectId ?? null,
    type: data.type ?? "task",
    status: data.status ?? "pending",
    difficulty,
    complexity,
    priority: priorityResult.priority,
    dueDate,
  });
}

export async function listTasks(userId: string) {
  return TaskModel.find({ userId }).sort({
    dueDate: 1,
    createdAt: -1,
  });
}

export async function getTaskById(
  userId: string,
  taskId: string,
) {
  return TaskModel.findOne({
    _id: taskId,
    userId,
  });
}

export interface UpdateTaskData {
  userId: string;
  taskId: string;
  title?: string;
  description?: string;
  subjectId?: string | null;
  type?: "task" | "work" | "assignment";
  status?: "pending" | "in_progress" | "completed";
  difficulty?: number;
  complexity?: number;
  dueDate?: Date | null;
}

export async function updateTask(data: UpdateTaskData) {
  const updateData: Record<string, unknown> = {};

  if (data.title !== undefined) {
    const title = data.title.trim();

    if (title.length < 2) {
      throw new Error(
        "O título da tarefa deve ter pelo menos 2 caracteres.",
      );
    }

    updateData.title = title;
  }

  if (data.description !== undefined) {
    updateData.description = data.description.trim();
  }

  if (data.subjectId !== undefined) {
    if (data.subjectId !== null) {
      const subject = await SubjectModel.findOne({
        _id: data.subjectId,
        userId: data.userId,
      });

      if (!subject) {
        throw new Error("Matéria não encontrada.");
      }
    }

    updateData.subjectId = data.subjectId;
  }

  if (data.type !== undefined) {
    updateData.type = data.type;
  }

  if (data.status !== undefined) {
    updateData.status = data.status;

    updateData.completedAt =
      data.status === "completed" ? new Date() : null;
  }

  if (data.difficulty !== undefined) {
    if (data.difficulty < 1 || data.difficulty > 5) {
      throw new Error("A dificuldade deve estar entre 1 e 5.");
    }

    updateData.difficulty = data.difficulty;
  }

  if (data.complexity !== undefined) {
    if (data.complexity < 1 || data.complexity > 5) {
      throw new Error("A complexidade deve estar entre 1 e 5.");
    }

    updateData.complexity = data.complexity;
  }

  if (data.dueDate !== undefined) {
    updateData.dueDate = data.dueDate;
  }

  const currentTask = await TaskModel.findOne({
    _id: data.taskId,
    userId: data.userId,
  });

  if (!currentTask) {
    throw new Error("Tarefa não encontrada.");
  }

  const user = await UserModel.findById(data.userId);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const priorityMode = user.preferences?.priorityMode ?? "balanced";

  const difficulty =
    data.difficulty ?? currentTask.difficulty;

  const complexity =
    data.complexity ?? currentTask.complexity;

  const dueDate =
    data.dueDate !== undefined
      ? data.dueDate
      : (currentTask.dueDate ?? null);

  const priorityResult = calculatePriority({
    dueDate,
    difficulty,
    complexity,
    mode: priorityMode,
  });

  updateData.priority = priorityResult.priority;

  if (Object.keys(updateData).length === 0) {
    throw new Error("Nenhum campo para atualizar.");
  }

  const task = await TaskModel.findOneAndUpdate(
    {
      _id: data.taskId,
      userId: data.userId,
    },
    {
      $set: updateData,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!task) {
    throw new Error("Tarefa não encontrada.");
  }

  return task;
}

export async function deleteTask(
  userId: string,
  taskId: string,
): Promise<void> {
  const task = await TaskModel.findOneAndDelete({
    _id: taskId,
    userId,
  });

  if (!task) {
    throw new Error("Tarefa não encontrada.");
  }
}

