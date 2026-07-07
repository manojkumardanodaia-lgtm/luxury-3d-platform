"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      alert("Name, email and message required");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert("Message sent successfully");
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      alert(data.message || "Message failed");
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="px-5 pt-32 pb-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-600">
              Hire 3D Designer
            </span>

            <h1 className="mt-6 max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
              Let’s build premium 3D visuals for your product.
            </h1>

            <p className="mt-5 max-w-xl text-neutral-600">
              Contact me for 3D modeling, product rendering, marketplace-ready
              assets, Amazon images, packaging mockups and interactive 3D work.
            </p>

            <div className="mt-8 space-y-3 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-700">
              <p>Email: 3ddesigner5546@gmail.com</p>
              <p>Phone: +91 8000093300</p>
              <p>Location: Rajasthan, India</p>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-xl sm:p-6">
            {[
              ["name", "Your Name"],
              ["email", "Email Address"],
              ["subject", "Project Subject"],
            ].map(([key, label]) => (
              <input
                key={key}
                value={(form as any)[key]}
                onChange={(e) => update(key, e.target.value)}
                className="mb-4 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-black"
                placeholder={label}
              />
            ))}

            <textarea
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className="mb-4 h-36 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-black"
              placeholder="Project details"
            />

            <button
              onClick={submit}
              disabled={loading}
              className="w-full rounded-full bg-black px-8 py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}