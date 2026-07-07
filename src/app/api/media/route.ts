import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Media from "@/models/Media";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  await connectDB();

  const media = await Media.find().sort({ createdAt: -1 }).lean();

  return NextResponse.json({
    success: true,
    media,
  });
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = String(formData.get("title") || "");

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File required" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: "lux3d-media-library",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const media = await Media.create({
      title: title || file.name,
      url: uploadResult.secure_url,
      fileType: uploadResult.resource_type,
      size: file.size,
    });

    return NextResponse.json({
      success: true,
      media,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}