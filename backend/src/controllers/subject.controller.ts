import type { Response } from "express";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import {
  createSubject,
  deleteSubject,
  getSubjectById,
  listSubjects,
  updateSubject,
} from "../services/subject.service.js";

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

    const { name, description, knowledgeLevel, difficulty, isCustom } =
      req.body;

    const subject = await createSubject({
      userId: req.userId,
      name,
      description,
      knowledgeLevel,
      difficulty,
      isCustom,
    });

    res.status(201).json({
      message: "Matéria criada com sucesso.",
      subject,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Erro ao criar matéria.";

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

    const subjects = await listSubjects(req.userId);

    res.status(200).json({
      subjects,
    });
  } catch {
    res.status(500).json({
      message: "Erro ao buscar matérias.",
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

    const subjectId = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

    const subject = await getSubjectById(
      req.userId,
      subjectId
    );

    if (!subject) {
      res.status(404).json({
        message: "Matéria não encontrada.",
      });
      return;
    }

    res.status(200).json({
      subject,
    });
  } catch {
    res.status(500).json({
      message: "Erro ao buscar matéria.",
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

    const subjectId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const {
      name,
      description,
      knowledgeLevel,
      difficulty,
      complexity,
    } = req.body;

    const subject = await updateSubject({
      userId: req.userId,
      subjectId,
      name,
      description,
      knowledgeLevel,
      difficulty,
      complexity,
    });

    res.status(200).json({
      message: "Matéria atualizada com sucesso.",
      subject,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Erro ao atualizar matéria.";

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

    const subjectId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    await deleteSubject(req.userId, subjectId);

    res.status(200).json({
      message: "Matéria excluída com sucesso.",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Erro ao excluir matéria.";

    res.status(404).json({
      message,
    });
  }
}