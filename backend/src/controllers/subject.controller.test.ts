import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("../services/subject.service.js", () => ({
  createSubject: vi.fn(),
  deleteSubject: vi.fn(),
  getSubjectById: vi.fn(),
  listSubjects: vi.fn(),
  updateSubject: vi.fn(),
}));

import {
  createSubject,
  deleteSubject,
  getSubjectById,
  listSubjects,
  updateSubject,
} from "../services/subject.service.js";

import {
  create,
  list,
  getById,
  update,
  remove,
} from "./subject.controller.js";

describe("Subject Controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("create", () => {
    it("deve rejeitar usuário não autenticado", async () => {
      const req = {
        userId: undefined,
        body: {
          name: "Química",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as any;

      await create(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Usuário não autenticado.",
      });

      expect(createSubject).not.toHaveBeenCalled();
    });

    it("deve criar uma matéria com sucesso", async () => {
      const subject = {
        _id: "materia-teste",
        userId: "usuario-teste",
        name: "Química",
      };

      vi.mocked(createSubject).mockResolvedValue(subject as any);

      const req = {
        userId: "usuario-teste",
        body: {
          name: "Química",
          description: "Matéria de química",
          knowledgeLevel: "basic",
          difficulty: 3,
          complexity: 3,
          isCustom: true,
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as any;

      await create(req, res);

      expect(createSubject).toHaveBeenCalledWith({
        userId: "usuario-teste",
        name: "Química",
        description: "Matéria de química",
        knowledgeLevel: "basic",
        difficulty: 3,
        complexity: 3,
        isCustom: true,
      });

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Matéria criada com sucesso.",
        subject,
      });
    });

    it("deve retornar 400 quando o service lançar erro", async () => {
      vi.mocked(createSubject).mockRejectedValue(
        new Error("Esta matéria já está cadastrada."),
      );

      const req = {
        userId: "usuario-teste",
        body: {
          name: "Química",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as any;

      await create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Esta matéria já está cadastrada.",
      });
    });
  });

  describe("list", () => {
    it("deve rejeitar usuário não autenticado", async () => {
      const req = {
        userId: undefined,
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as any;

      await list(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Usuário não autenticado.",
      });

      expect(listSubjects).not.toHaveBeenCalled();
    });

    it("deve listar as matérias do usuário", async () => {
      const subjects = [
        {
          _id: "materia-1",
          name: "Biologia",
        },
        {
          _id: "materia-2",
          name: "Química",
        },
      ];

      vi.mocked(listSubjects).mockResolvedValue(subjects as any);

      const req = {
        userId: "usuario-teste",
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as any;

      await list(req, res);

      expect(listSubjects).toHaveBeenCalledWith("usuario-teste");

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        subjects,
      });
    });
  });

  describe("getById", () => {
    it("deve rejeitar usuário não autenticado", async () => {
      const req = {
        userId: undefined,
        params: {
          id: "materia-teste",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as any;

      await getById(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Usuário não autenticado.",
      });

      expect(getSubjectById).not.toHaveBeenCalled();
    });

    it("deve retornar uma matéria pertencente ao usuário", async () => {
      const subject = {
        _id: "materia-teste",
        userId: "usuario-teste",
        name: "Química",
      };

      vi.mocked(getSubjectById).mockResolvedValue(subject as any);

      const req = {
        userId: "usuario-teste",
        params: {
          id: "materia-teste",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as any;

      await getById(req, res);

      expect(getSubjectById).toHaveBeenCalledWith(
        "usuario-teste",
        "materia-teste",
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        subject,
      });
    });

    it("deve retornar 404 quando a matéria não existir", async () => {
      vi.mocked(getSubjectById).mockResolvedValue(null);

      const req = {
        userId: "usuario-teste",
        params: {
          id: "materia-inexistente",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as any;

      await getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Matéria não encontrada.",
      });
    });
  });

  describe("update", () => {
    it("deve rejeitar usuário não autenticado", async () => {
      const req = {
        userId: undefined,
        params: {
          id: "materia-teste",
        },
        body: {},
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as any;

      await update(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Usuário não autenticado.",
      });

      expect(updateSubject).not.toHaveBeenCalled();
    });

    it("deve atualizar uma matéria com sucesso", async () => {
      const subject = {
        _id: "materia-teste",
        userId: "usuario-teste",
        name: "Química Orgânica",
      };

      vi.mocked(updateSubject).mockResolvedValue(subject as any);

      const req = {
        userId: "usuario-teste",
        params: {
          id: "materia-teste",
        },
        body: {
          name: "Química Orgânica",
          difficulty: 4,
          complexity: 5,
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as any;

      await update(req, res);

      expect(updateSubject).toHaveBeenCalledWith({
        userId: "usuario-teste",
        subjectId: "materia-teste",
        name: "Química Orgânica",
        description: undefined,
        knowledgeLevel: undefined,
        difficulty: 4,
        complexity: 5,
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Matéria atualizada com sucesso.",
        subject,
      });
    });

    it("deve retornar 400 quando a atualização falhar", async () => {
      vi.mocked(updateSubject).mockRejectedValue(
        new Error("Esta matéria já está cadastrada."),
      );

      const req = {
        userId: "usuario-teste",
        params: {
          id: "materia-teste",
        },
        body: {
          name: "Química",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as any;

      await update(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Esta matéria já está cadastrada.",
      });
    });
  });

  describe("remove", () => {
    it("deve rejeitar usuário não autenticado", async () => {
      const req = {
        userId: undefined,
        params: {
          id: "materia-teste",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as any;

      await remove(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Usuário não autenticado.",
      });

      expect(deleteSubject).not.toHaveBeenCalled();
    });

    it("deve excluir uma matéria com sucesso", async () => {
      vi.mocked(deleteSubject).mockResolvedValue(undefined);

      const req = {
        userId: "usuario-teste",
        params: {
          id: "materia-teste",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as any;

      await remove(req, res);

      expect(deleteSubject).toHaveBeenCalledWith(
        "usuario-teste",
        "materia-teste",
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Matéria excluída com sucesso.",
      });
    });

    it("deve retornar 404 quando a matéria não existir", async () => {
      vi.mocked(deleteSubject).mockRejectedValue(
        new Error("Matéria não encontrada."),
      );

      const req = {
        userId: "usuario-teste",
        params: {
          id: "materia-inexistente",
        },
      } as any;

      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as any;

      await remove(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Matéria não encontrada.",
      });
    });
  });
});