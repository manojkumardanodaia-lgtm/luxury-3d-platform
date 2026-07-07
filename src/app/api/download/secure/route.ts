import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { orderId } = await req.json();

    const order = await Order.findById(orderId).lean();

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    if (!order.downloadEnabled) {
      return NextResponse.json(
        { success: false, message: "Download not allowed" },
        { status: 403 }
      );
    }

    const product = await Product.findById(order.productId).lean();

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Asset not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      url: product.downloadZipUrl || "",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Secure download failed",
      },
      { status: 500 }
    );
  }
}