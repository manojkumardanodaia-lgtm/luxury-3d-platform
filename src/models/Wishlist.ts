import mongoose, { Schema, models } from "mongoose";

const WishlistSchema = new Schema(
  {
    userId: { type: String, default: "guest" },
    productId: { type: String, required: true },
  },
  { timestamps: true }
);

WishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Wishlist =
  models.Wishlist || mongoose.model("Wishlist", WishlistSchema);

export default Wishlist;