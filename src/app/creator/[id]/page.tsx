import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import FollowButton from "@/components/marketplace/FollowButton";

async function getAssets() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

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

export default async function CreatorPage() {
  const assets = await getAssets();

  return (
    <main className="min-h-screen bg-neutral-50 text-black">
      
      <section className="mx-auto max-w-7xl px-5 pt-32 pb-16">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-black text-4xl font-bold text-white">
              A
            </div>

            <h1 className="mt-5 text-4xl font-bold">
              Ashok 3D Studio
            </h1>

            <p className="mt-3 max-w-2xl text-neutral-600">
              Professional creator of premium 3D models for Blender,
              GLB, FBX and product visualization.
            </p>
              <Navbar />
              <FollowButton creatorId="ashok-3d-studio" />
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div>
                <h2 className="text-3xl font-bold">
                  {assets.length}
                </h2>
                <p className="text-neutral-500">
                  Assets
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  12K+
                </h2>
                <p className="text-neutral-500">
                  Downloads
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  ★ 4.9
                </h2>
                <p className="text-neutral-500">
                  Rating
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="mt-10 mb-6 text-3xl font-bold">
          Published Assets
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {assets.map((item: any) => (
            <Link
              key={item._id}
              href={`/portfolio/${item._id}`}
              className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="aspect-square w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center bg-neutral-100 text-neutral-400">
                  No Image
                </div>
              )}

              <div className="p-4">
                <h3 className="line-clamp-1 font-bold">
                  {item.name}
                </h3>

                <p className="mt-2 text-sm text-neutral-500">
                  {item.category || "3D Asset"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}