import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find({})
      .sort({ level: 1, sortOrder: 1, name: 1 })
      .lean();

    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, categories: [], message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.name?.trim()) {
      return NextResponse.json(
        { success: false, message: "Category name required" },
        { status: 400 }
      );
    }

    let level = 0;
    let path: string[] = [];

    if (body.parentId) {
      const parent: any = await Category.findById(body.parentId).lean();

      if (!parent) {
        return NextResponse.json(
          { success: false, message: "Parent category not found" },
          { status: 404 }
        );
      }

      level = Math.min((parent.level || 0) + 1, 3);
      path = [...(parent.path || []), parent.name];
    }

    const category = await Category.create({
      name: body.name.trim(),
      slug: slugify(body.name),
      parentId: body.parentId || "",
      level,
      path,
      active: body.active ?? true,
      sortOrder: Number(body.sortOrder || 0),
    });

    return NextResponse.json({ success: true, category });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Category add failed" },
      { status: 500 }
    );
  }
}