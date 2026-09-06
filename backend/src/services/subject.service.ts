import { SubjectModel } from "../models/Subject.js";

export interface CreateSubjectData {
  userId: string;
  name: string;
  description?: string;
  knowledgeLevel?: "unknown" | "basic" | "medium" | "advanced";
  difficulty?: number;
  isCustom?: boolean;
}

export async function createSubject(data: CreateSubjectData) {
  const name = data.name.trim();

  if (name.length < 2) {
    throw new Error("O nome da matéria deve ter pelo menos 2 caracteres.");
  }

  if (data.difficulty !== undefined) {
    if (data.difficulty < 1 || data.difficulty > 5) {
      throw new Error("A dificuldade deve estar entre 1 e 5.");
    }
  }

  const existingSubject = await SubjectModel.findOne({
    userId: data.userId,
    name,
  });

  if (existingSubject) {
    throw new Error("Esta matéria já está cadastrada.");
  }

  return SubjectModel.create({
    userId: data.userId,
    name,
    description: data.description?.trim() ?? "",
    knowledgeLevel: data.knowledgeLevel ?? "unknown",
    difficulty: data.difficulty ?? 3,
    isCustom: data.isCustom ?? true,
  });
}

export async function listSubjects(userId: string) {
  return SubjectModel.find({ userId }).sort({ name: 1 });
}

export async function getSubjectById(
  userId: string,
  subjectId: string,
) {
  return SubjectModel.findOne({
    _id: subjectId,
    userId,
  });
}
export interface UpdateSubjectData {
  userId: string;
  subjectId: string;
  name?: string;
  description?: string;
  knowledgeLevel?: "unknown" | "basic" | "medium" | "advanced";
  difficulty?: number;
  complexity?: number;
}

export async function updateSubject(data: UpdateSubjectData) {
  const updateData: Record<string, unknown> = {};

  if (data.name !== undefined) {
    const name = data.name.trim();

    if (name.length < 2) {
      throw new Error(
        "O nome da matéria deve ter pelo menos 2 caracteres.",
      );
    }

    const existingSubject = await SubjectModel.findOne({
      userId: data.userId,
      name,
      _id: { $ne: data.subjectId },
    });

    if (existingSubject) {
      throw new Error("Esta matéria já está cadastrada.");
    }

    updateData.name = name;
  }

  if (data.description !== undefined) {
    updateData.description = data.description.trim();
  }

  if (data.knowledgeLevel !== undefined) {
    updateData.knowledgeLevel = data.knowledgeLevel;
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

  const subject = await SubjectModel.findOneAndUpdate(
    {
      _id: data.subjectId,
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

  if (!subject) {
    throw new Error("Matéria não encontrada.");
  }

  return subject;
}
export async function deleteSubject(
  userId: string,
  subjectId: string,
): Promise<void> {
  const subject = await SubjectModel.findOneAndDelete({
    _id: subjectId,
    userId,
  });

  if (!subject) {
    throw new Error("Matéria não encontrada.");
  }
}