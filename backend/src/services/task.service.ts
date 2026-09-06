import { TaskModel } from "../models/Task.js";

export interface CreateTaskData {
  userId: string;
  title: string;
  description?: string;
  subjectId?: string | null;
  type?: "task" | "work" | "assignment";
  status?: "pending" | "in_progress" | "completed";
  difficulty?: number;
  complexity?: number;
  priority?: "low" | "medium" | "high";
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

  return TaskModel.create({
    userId: data.userId,
    title,
    description: data.description?.trim() ?? "",
    subjectId: data.subjectId ?? null,
    type: data.type ?? "task",
    status: data.status ?? "pending",
    difficulty: data.difficulty ?? 3,
    complexity: data.complexity ?? 3,
    priority: data.priority ?? "medium",
    dueDate: data.dueDate ?? null,
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
  priority?: "low" | "medium" | "high";
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

  if (data.priority !== undefined) {
    updateData.priority = data.priority;
  }

  if (data.dueDate !== undefined) {
    updateData.dueDate = data.dueDate;
  }

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