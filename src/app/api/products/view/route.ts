import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid asset ID" },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).lean();

    return NextResponse.json({
      success: true,
      views: product?.views || 0,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "View update failed" },
      { status: 500 }
    );
  }
}