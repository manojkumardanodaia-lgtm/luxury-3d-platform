"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={logout}
      className="mt-6 w-full rounded-2xl border border-red-500/30 px-4 py-3 text-sm text-red-300 hover:bg-red-500/10"
    >
      Logout
    </button>
  );
}