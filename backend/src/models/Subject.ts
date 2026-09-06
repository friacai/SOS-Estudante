import { Schema, model, type InferSchemaType } from "mongoose";

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
      maxlength: 500,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    knowledgeLevel: {
      type: String,
      enum: ["unknown", "basic", "medium", "advanced"],
      default: "unknown",
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

    isCustom: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

subjectSchema.index({ userId: 1, name: 1 }, { unique: true });

export type Subject = InferSchemaType<typeof subjectSchema>;

export const SubjectModel = model<Subject>("Subject", subjectSchema);