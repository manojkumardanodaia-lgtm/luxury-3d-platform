"use client";

import { useEffect, useState } from "react";

export default function DashboardServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const loadServices = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data.services || []);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const addService = async () => {
    if (!form.title || !form.description) {
      alert("Title and description required");
      return;
    }

    const res = await fetch("/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      setForm({ title: "", description: "" });
      loadServices();
    }
  };

  return (
    <div className="px-6 py-28 text-white">
      <h1 className="text-4xl font-semibold">Services CMS</h1>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="mb-4 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
          placeholder="Service title"
        />

        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="mb-4 h-28 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
          placeholder="Service description"
        />

        <button
          onClick={addService}
          className="rounded-full bg-white px-6 py-3 font-semibold text-black"
        >
          Add Service
        </button>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((item) => (
          <div
            key={item._id}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
          >
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm text-neutral-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}