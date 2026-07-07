import mongoose, { Schema, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    productId: { type: String, required: true },
    userId: { type: String, default: "guest" },
    name: { type: String, default: "Guest User" },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    comment: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Approved", "Pending", "Rejected"],
      default: "Approved",
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ productId: 1 });
ReviewSchema.index({ userId: 1 });

const Review = models.Review || mongoose.model("Review", ReviewSchema);

export default Review;