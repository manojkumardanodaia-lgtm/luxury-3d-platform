import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    // Basic
    name: { type: String, required: true },
    slug: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },

    // Category
    category: { type: String, default: "" },
    subCategory: { type: String, default: "" },
    childCategory: { type: String, default: "" },
    categoryPath: { type: [String], default: [] },

    // Media
    thumbnail: { type: String, default: "" },
    galleryImages: { type: [String], default: [] },
    modelUrl: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
    hdriUrl: { type: String, default: "" },

    // Client / Brand
    clientName: { type: String, default: "" },
    brandName: { type: String, default: "" },

    // Project Info
    softwareUsed: { type: [String], default: [] },
    projectYear: { type: String, default: "" },
    duration: { type: String, default: "" },

    // Tags
    tags: { type: [String], default: [] },

   // Pricing / Download
price: { type: Number, default: 0 },
isFree: { type: Boolean, default: true },
downloadType: {
  type: String,
  enum: ["Free", "Paid"],
  default: "Free",
},
downloadZipUrl: { type: String, default: "" },
license: { type: String, default: "" },
    // SEO
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    seoKeywords: { type: [String], default: [] },

    // Publish
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    featured: { type: Boolean, default: false },
    visibility: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
    },

    // Analytics
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },

    // Owner
    creatorId: { type: String, default: "" },
  },
  { timestamps: true }
);

ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ creatorId: 1 });

const Product = models.Product || mongoose.model("Product", ProductSchema);

export default Product;