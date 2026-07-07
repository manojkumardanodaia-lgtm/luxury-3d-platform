import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function toList(value: FormDataEntryValue | null) {
  return String(value || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

async function uploadToCloudinary(
  file: File,
  folder: string,
  resourceType: "image" | "raw" | "auto"
) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return await new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: resourceType,
          folder,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(buffer);
  });
}

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch projects", products: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const name =
      String(formData.get("name") || "").trim() ||
      `Untitled Project ${Date.now()}`;

    const slug = String(formData.get("slug") || "") || slugify(name);
    const shortDescription = String(formData.get("shortDescription") || "");
    const description = String(formData.get("description") || "");

    const category = String(formData.get("category") || "");
    const subCategory = String(formData.get("subCategory") || "");
    const childCategory = String(formData.get("childCategory") || "");

    const clientName = String(formData.get("clientName") || "");
    const brandName = String(formData.get("brandName") || "");
    const projectYear = String(formData.get("projectYear") || "");
    const duration = String(formData.get("duration") || "");

    const videoUrl = String(formData.get("videoUrl") || "");
    const hdriUrl = String(formData.get("hdriUrl") || "");

    const price = Number(formData.get("price") || 0);
    const license = String(formData.get("license") || "");

    const seoTitle = String(formData.get("seoTitle") || "");
    const seoDescription = String(formData.get("seoDescription") || "");

    const status = String(formData.get("status") || "Draft");
    const featured = String(formData.get("featured") || "false") === "true";
    const visibility = String(formData.get("visibility") || "Public");

    let thumbnail = String(formData.get("thumbnail") || "");
    const thumbnailFile = formData.get("thumbnailFile") as File | null;
    const modelFile = formData.get("model") as File | null;

    const tags = toList(formData.get("tags"));
    const softwareUsed = toList(formData.get("softwareUsed"));
    const seoKeywords = toList(formData.get("seoKeywords"));

    if (!modelFile || modelFile.size === 0) {
      return NextResponse.json(
        { success: false, message: "3D model file is required" },
        { status: 400 }
      );
    }

    const modelUpload = await uploadToCloudinary(
      modelFile,
      "luxury-3d-products",
      "raw"
    );

    if (thumbnailFile && thumbnailFile.size > 0) {
      const thumbUpload = await uploadToCloudinary(
        thumbnailFile,
        "lux3d-thumbnails",
        "image"
      );

      thumbnail = thumbUpload.secure_url;
    }

    const product = await Product.create({
      name,
      slug,
      shortDescription,
      description,

      category,
      subCategory,
      childCategory,
      categoryPath: [category, subCategory, childCategory].filter(Boolean),

      thumbnail,
      galleryImages: [],
      modelUrl: modelUpload.secure_url,
      videoUrl,
      hdriUrl,

      clientName,
      brandName,
      softwareUsed,
      projectYear,
      duration,

      tags,

      price,
      license,

      seoTitle,
      seoDescription,
      seoKeywords,

      status,
      featured,
      visibility,

      creatorId: "personal-admin",
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}