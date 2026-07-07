"use client";

import { useState } from "react";

export default function FollowButton({
  creatorId,
}: {
  creatorId: string;
}) {
  const [following, setFollowing] = useState(false);

  const toggleFollow = async () => {
    if (!following) {
      await fetch("/api/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ creatorId }),
      });

      setFollowing(true);
    } else {
      await fetch("/api/follow", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ creatorId }),
      });

      setFollowing(false);
    }
  };

  return (
    <button
      onClick={toggleFollow}
      className="mt-6 rounded-full bg-black px-7 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
    >
      {following ? "Following" : "Follow Creator"}
    </button>
  );
}