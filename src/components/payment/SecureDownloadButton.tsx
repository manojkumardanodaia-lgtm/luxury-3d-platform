"use client";

import { useState } from "react";

export default function SecureDownloadButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false);

  const download = async () => {
    setLoading(true);

    const res = await fetch("/api/download/secure", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success || !data.url) {
      alert(data.message || "Download not available");
      return;
    }

    window.open(data.url, "_blank");
  };

  return (
    <button
      onClick={download}
      disabled={loading}
      className="mt-5 w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50"
    >
      {loading ? "Preparing..." : "Download Secure File"}
    </button>
  );
}