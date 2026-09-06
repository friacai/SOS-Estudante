export type PriorityMode =
  | "deadline"
  | "difficulty"
  | "complexity"
  | "balanced";

export interface PriorityInput {
  dueDate: Date | null;
  difficulty: number;
  complexity: number;
  mode: PriorityMode;
}

export interface PriorityResult {
  score: number;
  priority: "low" | "medium" | "high";
}
const PRIORITY_WEIGHTS = {
  deadline: {
    deadline: 0.70,
    difficulty: 0.15,
    complexity: 0.15,
  },

  difficulty: {
    deadline: 0.15,
    difficulty: 0.70,
    complexity: 0.15,
  },

  complexity: {
    deadline: 0.15,
    difficulty: 0.15,
    complexity: 0.70,
  },

  balanced: {
    deadline: 0.40,
    difficulty: 0.30,
    complexity: 0.30,
  },
};
export function calculateDeadlineScore(
  dueDate: Date | null,
  now: Date = new Date(),
): number {
  if (!dueDate) {
    return 0;
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const differenceInDays =
    (dueDate.getTime() - now.getTime()) / millisecondsPerDay;

  if (differenceInDays <= 0) {
    return 100;
  }

  if (differenceInDays <= 1) {
    return 90;
  }

  if (differenceInDays <= 2) {
    return 80;
  }

  if (differenceInDays <= 3) {
    return 70;
  }

  if (differenceInDays <= 5) {
    return 60;
  }

  if (differenceInDays <= 7) {
    return 50;
  }

  if (differenceInDays <= 10) {
    return 40;
  }

  if (differenceInDays <= 14) {
    return 30;
  }

  return 20;
}
export function calculateDifficultyScore(
  difficulty: number,
): number {
  return Math.min(5, Math.max(1, difficulty)) * 20;
}

export function calculateComplexityScore(
  complexity: number,
): number {
  return Math.min(5, Math.max(1, complexity)) * 20;
}
export function calculatePriority(
  input: PriorityInput,
  now: Date = new Date(),
): PriorityResult {
  const deadlineScore = calculateDeadlineScore(
    input.dueDate,
    now,
  );

  const difficultyScore = calculateDifficultyScore(
    input.difficulty,
  );

  const complexityScore = calculateComplexityScore(
    input.complexity,
  );

  const weights = PRIORITY_WEIGHTS[input.mode];

  const score =
    deadlineScore * weights.deadline +
    difficultyScore * weights.difficulty +
    complexityScore * weights.complexity;

  const roundedScore = Math.round(score);

  let priority: "low" | "medium" | "high";

  if (roundedScore >= 70) {
    priority = "high";
  } else if (roundedScore >= 40) {
    priority = "medium";
  } else {
    priority = "low";
  }

  return {
    score: roundedScore,
    priority,
  };
}