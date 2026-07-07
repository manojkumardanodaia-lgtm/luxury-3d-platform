"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.push("/login");
      router.refresh();
    };

    logout();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        Logging out...
      </div>
    </main>
  );
}