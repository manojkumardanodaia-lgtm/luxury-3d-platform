"use client";

import { useEffect, useState } from "react";

export default function ReviewsSection({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    rating: "5",
    comment: "",
  });

  const loadReviews = async () => {
    const res = await fetch(`/api/reviews?productId=${productId}`);
    const data = await res.json();
    setReviews(data.reviews || []);
  };

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const submit = async () => {
    if (!form.comment.trim()) {
      alert("Review comment required");
      return;
    }

    await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        ...form,
      }),
    });

    setForm({ name: "", rating: "5", comment: "" });
    loadReviews();
  };

  return (
    <section className="mt-10 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-black">Ratings & Reviews</h2>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="mb-3 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-black"
          />

          <select
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            className="mb-3 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-black"
          >
            <option value="5">★★★★★ 5</option>
            <option value="4">★★★★☆ 4</option>
            <option value="3">★★★☆☆ 3</option>
            <option value="2">★★☆☆☆ 2</option>
            <option value="1">★☆☆☆☆ 1</option>
          </select>

          <textarea
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            placeholder="Write your review..."
            className="h-28 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-black"
          />

          <button
            onClick={submit}
            className="mt-4 w-full rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            Submit Review
          </button>
        </div>

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center text-sm text-neutral-500">
              No reviews yet.
            </div>
          ) : (
            reviews.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-black">{item.name}</h3>
                  <p className="text-sm font-bold text-black">
                    {"★".repeat(item.rating)}
                    {"☆".repeat(5 - item.rating)}
                  </p>
                </div>

                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {item.comment}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}