"use client";

import { useState } from "react";

export default function WishlistButton({
  id,
}: {
  id: string;
}) {
  const [liked, setLiked] = useState(false);

  const toggle = async () => {
    if (!liked) {
      await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      setLiked(true);
    } else {
      await fetch("/api/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      setLiked(false);
    }
  };

  return (
    <button
      onClick={toggle}
      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105"
    >
      {liked ? "❤️" : "🤍"}
    </button>
  );
}