import mongoose, { Schema, models } from "mongoose";

const OrderSchema = new Schema(
  {
    productId: { type: String, required: true },
    productName: { type: String, default: "" },
    productImage: { type: String, default: "" },

    customerName: { type: String, default: "" },
    customerEmail: { type: String, default: "" },
    customerPhone: { type: String, default: "" },

    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    paymentProvider: { type: String, default: "Razorpay" },
    razorpayOrderId: { type: String, default: "" },
    razorpayPaymentId: { type: String, default: "" },
    razorpaySignature: { type: String, default: "" },

    downloadEnabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = models.Order || mongoose.model("Order", OrderSchema);

export default Order;