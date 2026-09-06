import { describe, expect, it } from "vitest";
import {
  calculateComplexityScore,
  calculateDeadlineScore,
  calculateDifficultyScore,
  calculatePriority,
} from "./priority.service.js";

describe("Priority Service", () => {
  describe("calculateDeadlineScore", () => {
    const now = new Date("2026-09-06T12:00:00.000Z");

    it("deve retornar 0 quando não existe prazo", () => {
      expect(calculateDeadlineScore(null, now)).toBe(0);
    });

    it("deve retornar 100 para tarefas vencidas", () => {
      const dueDate = new Date("2026-09-05T12:00:00.000Z");

      expect(calculateDeadlineScore(dueDate, now)).toBe(100);
    });

    it("deve retornar 90 para tarefas com prazo de até 1 dia", () => {
      const dueDate = new Date("2026-09-07T12:00:00.000Z");

      expect(calculateDeadlineScore(dueDate, now)).toBe(90);
    });

    it("deve retornar 50 para tarefas com prazo de até 7 dias", () => {
      const dueDate = new Date("2026-09-13T12:00:00.000Z");

      expect(calculateDeadlineScore(dueDate, now)).toBe(50);
    });
  });

  describe("calculateDifficultyScore", () => {
    it("deve transformar dificuldade 1 em 20", () => {
      expect(calculateDifficultyScore(1)).toBe(20);
    });

    it("deve transformar dificuldade 3 em 60", () => {
      expect(calculateDifficultyScore(3)).toBe(60);
    });

    it("deve transformar dificuldade 5 em 100", () => {
      expect(calculateDifficultyScore(5)).toBe(100);
    });
  });

  describe("calculateComplexityScore", () => {
    it("deve transformar complexidade 1 em 20", () => {
      expect(calculateComplexityScore(1)).toBe(20);
    });

    it("deve transformar complexidade 3 em 60", () => {
      expect(calculateComplexityScore(3)).toBe(60);
    });

    it("deve transformar complexidade 5 em 100", () => {
      expect(calculateComplexityScore(5)).toBe(100);
    });
  });

  describe("calculatePriority", () => {
    const now = new Date("2026-09-06T12:00:00.000Z");

    it("deve calcular prioridade no modo deadline", () => {
      const result = calculatePriority(
        {
          dueDate: new Date("2026-09-07T12:00:00.000Z"),
          difficulty: 5,
          complexity: 5,
          mode: "deadline",
        },
        now,
      );

      expect(result.score).toBe(93);
      expect(result.priority).toBe("high");
    });

    it("deve calcular prioridade no modo difficulty", () => {
      const result = calculatePriority(
        {
          dueDate: null,
          difficulty: 5,
          complexity: 1,
          mode: "difficulty",
        },
        now,
      );

      expect(result.score).toBe(73);
      expect(result.priority).toBe("high");
    });

    it("deve calcular prioridade no modo complexity", () => {
      const result = calculatePriority(
        {
          dueDate: null,
          difficulty: 1,
          complexity: 5,
          mode: "complexity",
        },
        now,
      );

      expect(result.score).toBe(73);
      expect(result.priority).toBe("high");
    });

    it("deve calcular prioridade no modo balanced", () => {
      const result = calculatePriority(
        {
          dueDate: new Date("2026-09-07T12:00:00.000Z"),
          difficulty: 5,
          complexity: 4,
          mode: "balanced",
        },
        now,
      );

      expect(result.score).toBe(90);
      expect(result.priority).toBe("high");
    });
  });
});