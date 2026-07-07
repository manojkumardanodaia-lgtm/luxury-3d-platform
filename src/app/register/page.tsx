"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@gmail\.com$/;

    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid Gmail address. Example: yourname@gmail.com");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!passwordRegex.test(form.password)) {
      alert(
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character.\n\nExample: Abcd@3434"
      );
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert("Account created successfully");
      router.push("/login");
    } else {
      alert(data.message || "Register failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">
          Create Account
        </p>

        <h1 className="mt-3 text-4xl font-semibold">Join LUX3D</h1>

        <div className="mt-8 space-y-4">
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
            placeholder="Name"
          />

          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
            placeholder="Gmail address"
          />

          <input
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
            placeholder="Password"
          />

          <p className="text-xs leading-5 text-neutral-500">
            Gmail required. Example:{" "}
            <span className="text-green-400">yourname@gmail.com</span>
            <br />
            Password example:{" "}
            <span className="text-green-400">Abcd@3434</span>
          </p>
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="mt-6 w-full rounded-full bg-white px-6 py-3 font-semibold text-black disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="mt-5 text-center text-sm text-neutral-400">
          Already have account?{" "}
          <Link href="/login" className="text-white">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}