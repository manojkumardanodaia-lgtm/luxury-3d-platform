import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { productId, customerName, customerEmail, customerPhone } = body;

    const product = await Product.findById(productId).lean();

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Asset not found" },
        { status: 404 }
      );
    }

    if (product.isFree) {
      return NextResponse.json(
        { success: false, message: "This asset is free" },
        { status: 400 }
      );
    }

    const amount = Number(product.price || 0);

    if (amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid asset price" },
        { status: 400 }
      );
    }

    const razorpayOrderId = `order_${crypto.randomBytes(10).toString("hex")}`;

    const order = await Order.create({
      productId,
      productName: product.name || "",
      productImage: product.thumbnail || "",
      customerName: customerName || "",
      customerEmail: customerEmail || "",
      customerPhone: customerPhone || "",
      amount,
      currency: "INR",
      status: "Pending",
      razorpayOrderId,
    });

    return NextResponse.json({
      success: true,
      order,
      razorpayOrder: {
        id: razorpayOrderId,
        amount: amount * 100,
        currency: "INR",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Payment order failed" },
      { status: 500 }
    );
  }
}