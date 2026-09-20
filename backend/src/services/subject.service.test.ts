import { beforeEach, describe, expect, it, vi } from "vitest";
import { SubjectModel } from "../models/Subject.js";
import {
  createSubject,
  deleteSubject,
  getSubjectById,
  listSubjects,
  updateSubject,
} from "./subject.service.js";

vi.mock("../models/Subject.js", () => ({
  SubjectModel: {
    create: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    findOneAndUpdate: vi.fn(),
    findOneAndDelete: vi.fn(),
  },
}));

describe("subject.service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createSubject", () => {
    it("deve criar uma matéria com dados válidos", async () => {
      vi.mocked(SubjectModel.findOne).mockResolvedValue(null);

      vi.mocked(SubjectModel.create).mockResolvedValue({
        _id: "materia-teste",
        userId: "usuario-teste",
        name: "Química",
        description: "Estudos de Química",
        knowledgeLevel: "basic",
        difficulty: 4,
        complexity: 3,
        isCustom: true,
      } as any);

      const subject = await createSubject({
        userId: "usuario-teste",
        name: "Química",
        description: "Estudos de Química",
        knowledgeLevel: "basic",
        difficulty: 4,
        complexity: 3,
      });

      expect(SubjectModel.findOne).toHaveBeenCalledWith({
        userId: "usuario-teste",
        name: "Química",
      });

      expect(SubjectModel.create).toHaveBeenCalledWith({
        userId: "usuario-teste",
        name: "Química",
        description: "Estudos de Química",
        knowledgeLevel: "basic",
        difficulty: 4,
        complexity: 3,
        isCustom: true,
      });

      expect(subject.name).toBe("Química");
    });

    it("deve aplicar valores padrão quando não informados", async () => {
      vi.mocked(SubjectModel.findOne).mockResolvedValue(null);

      vi.mocked(SubjectModel.create).mockResolvedValue({
        _id: "materia-teste",
        userId: "usuario-teste",
        name: "Física",
        description: "",
        knowledgeLevel: "unknown",
        difficulty: 3,
        complexity: 3,
        isCustom: true,
      } as any);

      await createSubject({
        userId: "usuario-teste",
        name: "Física",
      });

      expect(SubjectModel.create).toHaveBeenCalledWith({
        userId: "usuario-teste",
        name: "Física",
        description: "",
        knowledgeLevel: "unknown",
        difficulty: 3,
        complexity: 3,
        isCustom: true,
      });
    });

    it("deve remover espaços extras do nome e descrição", async () => {
      vi.mocked(SubjectModel.findOne).mockResolvedValue(null);
      vi.mocked(SubjectModel.create).mockResolvedValue({} as any);

      await createSubject({
        userId: "usuario-teste",
        name: "  Matemática  ",
        description: "  Estudos para prova  ",
      });

      expect(SubjectModel.findOne).toHaveBeenCalledWith({
        userId: "usuario-teste",
        name: "Matemática",
      });

      expect(SubjectModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Matemática",
          description: "Estudos para prova",
        }),
      );
    });

    it("deve rejeitar nome com menos de 2 caracteres", async () => {
      await expect(
        createSubject({
          userId: "usuario-teste",
          name: "A",
        }),
      ).rejects.toThrow(
        "O nome da matéria deve ter pelo menos 2 caracteres.",
      );

      expect(SubjectModel.findOne).not.toHaveBeenCalled();
      expect(SubjectModel.create).not.toHaveBeenCalled();
    });

    it("deve rejeitar dificuldade menor que 1", async () => {
      await expect(
        createSubject({
          userId: "usuario-teste",
          name: "Química",
          difficulty: 0,
        }),
      ).rejects.toThrow("A dificuldade deve estar entre 1 e 5.");

      expect(SubjectModel.create).not.toHaveBeenCalled();
    });

    it("deve rejeitar dificuldade maior que 5", async () => {
      await expect(
        createSubject({
          userId: "usuario-teste",
          name: "Química",
          difficulty: 6,
        }),
      ).rejects.toThrow("A dificuldade deve estar entre 1 e 5.");

      expect(SubjectModel.create).not.toHaveBeenCalled();
    });

    it("deve rejeitar complexidade menor que 1", async () => {
      await expect(
        createSubject({
          userId: "usuario-teste",
          name: "Química",
          complexity: 0,
        }),
      ).rejects.toThrow("A complexidade deve estar entre 1 e 5.");

      expect(SubjectModel.create).not.toHaveBeenCalled();
    });

    it("deve rejeitar complexidade maior que 5", async () => {
      await expect(
        createSubject({
          userId: "usuario-teste",
          name: "Química",
          complexity: 6,
        }),
      ).rejects.toThrow("A complexidade deve estar entre 1 e 5.");

      expect(SubjectModel.create).not.toHaveBeenCalled();
    });

    it("deve rejeitar matéria duplicada para o mesmo usuário", async () => {
      vi.mocked(SubjectModel.findOne).mockResolvedValue({
        _id: "materia-existente",
        userId: "usuario-teste",
        name: "Química",
      } as any);

      await expect(
        createSubject({
          userId: "usuario-teste",
          name: "Química",
        }),
      ).rejects.toThrow("Esta matéria já está cadastrada.");

      expect(SubjectModel.create).not.toHaveBeenCalled();
    });
  });

  describe("listSubjects", () => {
    it("deve listar somente as matérias do usuário e ordenar por nome", async () => {
      const sortMock = vi.fn().mockResolvedValue([
        {
          _id: "materia-1",
          userId: "usuario-teste",
          name: "Biologia",
        },
        {
          _id: "materia-2",
          userId: "usuario-teste",
          name: "Química",
        },
      ]);

      vi.mocked(SubjectModel.find).mockReturnValue({
        sort: sortMock,
      } as any);

      const subjects = await listSubjects("usuario-teste");

      expect(SubjectModel.find).toHaveBeenCalledWith({
        userId: "usuario-teste",
      });

      expect(sortMock).toHaveBeenCalledWith({
        name: 1,
      });

      expect(subjects).toHaveLength(2);
    });
  });

  describe("getSubjectById", () => {
    it("deve buscar a matéria pelo ID pertencente ao usuário", async () => {
      vi.mocked(SubjectModel.findOne).mockResolvedValue({
        _id: "materia-teste",
        userId: "usuario-teste",
        name: "Química",
      } as any);

      const subject = await getSubjectById(
        "usuario-teste",
        "materia-teste",
      );

      expect(SubjectModel.findOne).toHaveBeenCalledWith({
        _id: "materia-teste",
        userId: "usuario-teste",
      });

      expect(subject?.name).toBe("Química");
    });

    it("não deve acessar matéria de outro usuário", async () => {
      vi.mocked(SubjectModel.findOne).mockResolvedValue(null);

      const subject = await getSubjectById(
        "outro-usuario",
        "materia-teste",
      );

      expect(SubjectModel.findOne).toHaveBeenCalledWith({
        _id: "materia-teste",
        userId: "outro-usuario",
      });

      expect(subject).toBeNull();
    });
  });

  describe("updateSubject", () => {
    it("deve atualizar o nome da matéria", async () => {
      vi.mocked(SubjectModel.findOne).mockResolvedValue(null);

      vi.mocked(SubjectModel.findOneAndUpdate).mockResolvedValue({
        _id: "materia-teste",
        userId: "usuario-teste",
        name: "Química Orgânica",
      } as any);

      const subject = await updateSubject({
        userId: "usuario-teste",
        subjectId: "materia-teste",
        name: "  Química Orgânica  ",
      });

      expect(SubjectModel.findOne).toHaveBeenCalledWith({
        userId: "usuario-teste",
        name: "Química Orgânica",
        _id: { $ne: "materia-teste" },
      });

      expect(SubjectModel.findOneAndUpdate).toHaveBeenCalledWith(
        {
          _id: "materia-teste",
          userId: "usuario-teste",
        },
        {
          $set: {
            name: "Química Orgânica",
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );

      expect(subject?.name).toBe("Química Orgânica");
    });

    it("deve rejeitar nome duplicado ao atualizar", async () => {
      vi.mocked(SubjectModel.findOne).mockResolvedValue({
        _id: "outra-materia",
        userId: "usuario-teste",
        name: "Química",
      } as any);

      await expect(
        updateSubject({
          userId: "usuario-teste",
          subjectId: "materia-teste",
          name: "Química",
        }),
      ).rejects.toThrow("Esta matéria já está cadastrada.");

      expect(SubjectModel.findOneAndUpdate).not.toHaveBeenCalled();
    });

    it("deve atualizar descrição, nível, dificuldade e complexidade", async () => {
      vi.mocked(SubjectModel.findOneAndUpdate).mockResolvedValue({
        _id: "materia-teste",
        userId: "usuario-teste",
        name: "Química",
        description: "Nova descrição",
        knowledgeLevel: "advanced",
        difficulty: 5,
        complexity: 4,
      } as any);

      const subject = await updateSubject({
        userId: "usuario-teste",
        subjectId: "materia-teste",
        description: "  Nova descrição  ",
        knowledgeLevel: "advanced",
        difficulty: 5,
        complexity: 4,
      });

      expect(SubjectModel.findOneAndUpdate).toHaveBeenCalledWith(
        {
          _id: "materia-teste",
          userId: "usuario-teste",
        },
        {
          $set: {
            description: "Nova descrição",
            knowledgeLevel: "advanced",
            difficulty: 5,
            complexity: 4,
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );

      expect(subject?.difficulty).toBe(5);
      expect(subject?.complexity).toBe(4);
    });

    it("deve rejeitar dificuldade inválida", async () => {
      await expect(
        updateSubject({
          userId: "usuario-teste",
          subjectId: "materia-teste",
          difficulty: 6,
        }),
      ).rejects.toThrow("A dificuldade deve estar entre 1 e 5.");

      expect(SubjectModel.findOneAndUpdate).not.toHaveBeenCalled();
    });

    it("deve rejeitar complexidade inválida", async () => {
      await expect(
        updateSubject({
          userId: "usuario-teste",
          subjectId: "materia-teste",
          complexity: 0,
        }),
      ).rejects.toThrow("A complexidade deve estar entre 1 e 5.");

      expect(SubjectModel.findOneAndUpdate).not.toHaveBeenCalled();
    });

    it("deve rejeitar atualização sem campos", async () => {
      await expect(
        updateSubject({
          userId: "usuario-teste",
          subjectId: "materia-teste",
        }),
      ).rejects.toThrow("Nenhum campo para atualizar.");

      expect(SubjectModel.findOneAndUpdate).not.toHaveBeenCalled();
    });

    it("deve rejeitar matéria inexistente ou não pertencente ao usuário", async () => {
      vi.mocked(SubjectModel.findOneAndUpdate).mockResolvedValue(null);

      const result = updateSubject({
        userId: "usuario-teste",
        subjectId: "materia-inexistente",
        description: "Teste",
      });

      await expect(result).rejects.toThrow("Matéria não encontrada.");

      expect(SubjectModel.findOneAndUpdate).toHaveBeenCalledWith(
        {
          _id: "materia-inexistente",
          userId: "usuario-teste",
        },
        {
          $set: {
            description: "Teste",
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );
    });
  });

  describe("deleteSubject", () => {
    it("deve excluir uma matéria pertencente ao usuário", async () => {
      vi.mocked(SubjectModel.findOneAndDelete).mockResolvedValue({
        _id: "materia-teste",
        userId: "usuario-teste",
        name: "Química",
      } as any);

      await expect(
        deleteSubject("usuario-teste", "materia-teste"),
      ).resolves.toBeUndefined();

      expect(SubjectModel.findOneAndDelete).toHaveBeenCalledWith({
        _id: "materia-teste",
        userId: "usuario-teste",
      });
    });

    it("não deve excluir matéria inexistente ou de outro usuário", async () => {
      vi.mocked(SubjectModel.findOneAndDelete).mockResolvedValue(null);

      await expect(
        deleteSubject("usuario-teste", "materia-teste"),
      ).rejects.toThrow("Matéria não encontrada.");

      expect(SubjectModel.findOneAndDelete).toHaveBeenCalledWith({
        _id: "materia-teste",
        userId: "usuario-teste",
      });
    });
  });
});