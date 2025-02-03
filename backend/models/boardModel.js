import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  boardTitle: {
    type: String,
    required: [true, "board title is required"],
  },
  boardDescription: {
    type: String,
    required: [true, "board description is required"],
  },
  members: [
    {
      memberId: mongoose.Schema.Types.ObjectId,
      memberRole: {
        type: String,
        enum: ["OWNER", "EDITOR", "VIEWER"],
      },
      lastAccessedAt: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Board = mongoose.model("Board", boardSchema);
