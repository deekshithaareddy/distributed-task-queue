import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: String,

    type: String,

    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "completed",
        "failed",
      ],
      default: "pending",
    },

    result: String,
  },
  {
    timestamps: true,
  }
);

export const taskModel = model("task", taskSchema);