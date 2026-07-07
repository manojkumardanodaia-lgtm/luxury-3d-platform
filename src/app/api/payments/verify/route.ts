import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = body;

    const order = await Order.findOneAndUpdate(
      { razorpayOrderId },
      {
        status: "Paid",
        razorpayPaymentId: razorpayPaymentId || "",
        razorpaySignature: razorpaySignature || "",
        downloadEnabled: true,
      },
      { new: true }
    );

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Payment verify failed" },
      { status: 500 }
    );
  }
}