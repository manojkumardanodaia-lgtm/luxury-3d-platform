const stats = [
  { number: "1000+", label: "Premium Assets" },
  { number: "50+", label: "Categories" },
  { number: "10K+", label: "Downloads" },
  { number: "4.9★", label: "Average Rating" },
];

export default function HeroStats() {
  return (
    <section className="mt-14">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-3xl font-bold text-black">
              {item.number}
            </h2>

            <p className="mt-2 text-sm text-neutral-500">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}