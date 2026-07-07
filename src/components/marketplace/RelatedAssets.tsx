import Link from "next/link";

async function getAssets() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/public/products`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.products || [];
  } catch {
    return [];
  }
}

export default async function RelatedAssets({
  currentId,
  category,
}: {
  currentId: string;
  category?: string;
}) {
  const assets = await getAssets();

  const related = assets
    .filter((item: any) => item._id !== currentId)
    .filter((item: any) => !category || item.category === category)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-10 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black">Related Assets</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Similar premium 3D marketplace assets.
          </p>
        </div>

        <Link
          href="/portfolio"
          className="text-sm font-semibold text-neutral-500 hover:text-black"
        >
          View All →
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((item: any) => {
          const free = item.isFree ?? true;

          return (
            <Link
              key={item._id}
              href={`/portfolio/${item._id}`}
              className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center bg-neutral-100 text-neutral-400">
                  No Image
                </div>
              )}

              <div className="p-4">
                <h3 className="line-clamp-1 font-bold text-black">
                  {item.name || "Untitled Asset"}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
                    {item.category || "3D"}
                  </span>

                  <span className="text-sm font-bold text-black">
                    {free ? "Free" : `₹${item.price || 0}`}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}