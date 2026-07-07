import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Wishlist from "@/models/Wishlist";

const userId = "guest";

export async function GET() {
  try {
    await connectDB();

    const items = await Wishlist.find({ userId }).lean();

    return NextResponse.json({
      success: true,
      items: items.map((x: any) => x.productId),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Wishlist fetch failed" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    await Wishlist.updateOne(
      { userId, productId: id },
      { userId, productId: id },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Wishlist add failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    await Wishlist.deleteOne({ userId, productId: id });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Wishlist remove failed" },
      { status: 500 }
    );
  }
}