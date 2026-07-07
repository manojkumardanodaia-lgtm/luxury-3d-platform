export default function TrustedBrands() {
  const brands = [
    "Blender",
    "CGTrader",
    "Sketchfab",
    "Envato",
    "Shopify",
    "Amazon",
    "GLB",
    "FBX",
  ];

  return (
    <section className="border-y border-neutral-200 bg-white py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
          Marketplace Ready Assets
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
          {brands.map((brand) => (
            <div
              key={brand}
              className="flex h-16 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 text-sm font-bold text-neutral-700 transition hover:border-black hover:bg-white"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}