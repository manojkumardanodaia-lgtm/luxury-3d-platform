import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Review from "@/models/Review";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    const query: any = { status: "Approved" };
    if (productId) query.productId = productId;

    const reviews = await Review.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      reviews,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Reviews fetch failed" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const review = await Review.create({
      productId: body.productId,
      userId: "guest",
      name: body.name || "Guest User",
      rating: Number(body.rating || 5),
      comment: body.comment || "",
      status: "Approved",
    });

    return NextResponse.json({
      success: true,
      review,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Review create failed" },
      { status: 500 }
    );
  }
}