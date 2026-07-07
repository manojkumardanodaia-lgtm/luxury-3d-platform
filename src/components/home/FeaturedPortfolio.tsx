import Link from "next/link";

async function getProjects() {
  const res = await fetch("http://localhost:3000/api/public/products", {
    cache: "no-store",
  });

  const data = await res.json();
  return data.products || [];
}

export default async function FeaturedPortfolio() {
  const projects = await getProjects();

  return (
    <section className="px-6 py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">
          Featured Assets
        </p>

        <h2 className="mt-4 text-4xl font-semibold">
          Premium product modeling, rendering and interactive 3D visualization.
        </h2>

        <p className="mt-4 max-w-2xl text-neutral-400">
          Premium product modeling, rendering and interactive 3D visualization.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.slice(0, 6).map((item: any) => (
            <Link
              key={item._id}
              href={`/portfolio/${item._id}`}
              className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40"
            >
              <div className="overflow-hidden">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="aspect-square w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="aspect-square bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" />
                )}
              </div>

              <div className="p-6">
                <span className="rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs hover:border-cyan-400/40">
                  {item.category || "3D Design"}
                </span>

                <h3 className="mt-4 text-2xl font-semibold">
                  {item.name}
                </h3>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-400">
                  {item.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-neutral-500">
                    View Project
                  </span>

                  <span className="text-xl transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="mt-16 rounded-3xl border border-dashed border-white/10 p-16 text-center">
            <h3 className="text-2xl font-semibold">
              No Portfolio Projects Yet
            </h3>

            <p className="mt-4 text-neutral-400">
              Upload your first 3D project from the dashboard.
            </p>

            <Link
              href="/dashboard/upload"
              className="mt-8 inline-flex rounded-full border border-white/50 bg-black px-6 py-3 font-semibold text-black"
            >
              Upload Asset
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}