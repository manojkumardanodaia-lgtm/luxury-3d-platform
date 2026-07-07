import mongoose, { Schema, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },

    parentId: { type: String, default: "" },
    level: { type: Number, default: 0, min: 0, max: 3 },
    path: { type: [String], default: [] },

    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

CategorySchema.index({ parentId: 1 });
CategorySchema.index({ level: 1 });

export default models.Category || mongoose.model("Category", CategorySchema);