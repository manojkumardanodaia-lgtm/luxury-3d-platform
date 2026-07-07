import mongoose, { Schema, models } from "mongoose";

const MediaSchema = new Schema(
  {
    title: { type: String, default: "" },
    url: { type: String, required: true },
    fileType: { type: String, default: "image" },
    folder: { type: String, default: "media-library" },
    size: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Media || mongoose.model("Media", MediaSchema);