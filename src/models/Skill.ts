import mongoose, { Schema, models } from "mongoose";

const SkillSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "Software",
    },

    percentage: {
      type: Number,
      default: 100,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Skill ||
  mongoose.model("Skill", SkillSchema);