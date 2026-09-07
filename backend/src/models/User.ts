import { Schema, model, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: null,
    },

    bio: {
      type: String,
      default: "",
      maxlength: 500,
    },

    role: {
      type: String,
      enum: ["student", "teacher", "responsible"],
      default: "student",
    },

    timezone: {
      type: String,
      default: "America/Sao_Paulo",
    },

   preferences: {
  priorityMode: {
    type: String,
    enum: ["deadline", "difficulty", "complexity", "balanced"],
    default: "balanced",
  },
},

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model<User>("User", userSchema);