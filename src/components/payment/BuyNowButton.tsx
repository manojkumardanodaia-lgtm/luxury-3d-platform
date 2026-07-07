"use client";

import { useState } from "react";

export default function BuyNowButton({
  productId,
}: {
  productId: string;
}) {
  const [loading, setLoading] = useState(false);

  const buy = async () => {
    setLoading(true);

    const res = await fetch("/api/payments/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        customerName: "Guest User",
        customerEmail: "guest@example.com",
        customerPhone: "",
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      alert(data.message || "Unable to create order");
      return;
    }

    // Temporary flow until Razorpay is integrated
    const verify = await fetch("/api/payments/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        razorpayOrderId: data.razorpayOrder.id,
        razorpayPaymentId: `demo_payment_${Date.now()}`,
        razorpaySignature: "demo_signature",
      }),
    });

    const verifyData = await verify.json();

    if (!verifyData.success) {
      alert("Payment verification failed");
      return;
    }

    alert("Payment successful! Download is now enabled.");

    window.location.href = "/library";
  };

  return (
    <button
      onClick={buy}
      disabled={loading}
      className="w-full rounded-2xl border border-neutral-300 bg-neutral-100 px-6 py-4 text-sm font-semibold text-black transition hover:border-black disabled:opacity-50"
    >
      {loading ? "Processing..." : "Buy Now"}
    </button>
  );
}