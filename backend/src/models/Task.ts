import { Schema, model, type InferSchemaType } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },

    description: {
      type: String,
      default: "",
      maxlength: 2000,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    subjectId: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      default: null,
      index: true,
    },

    type: {
      type: String,
      enum: ["task", "work", "assignment"],
      default: "task",
    },

    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },

    difficulty: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },

    complexity: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    dueDate: {
      type: Date,
      default: null,
      index: true,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

taskSchema.index({ userId: 1, dueDate: 1 });
taskSchema.index({ userId: 1, status: 1 });

export type Task = InferSchemaType<typeof taskSchema>;

export const TaskModel = model<Task>("Task", taskSchema);