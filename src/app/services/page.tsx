import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

const services = [
  "3D Product Modeling",
  "Photorealistic Rendering",
  "Amazon Product Images",
  "360° Product Viewer",
  "Packaging Mockups",
  "AR Ready GLB Models",
  "Product Animation",
  "Texture & Material Setup",
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="px-5 pt-32 pb-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <span className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-600">
            Custom 3D Services
          </span>

          <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
                Premium 3D design services for product brands.
              </h1>

              <p className="mt-5 max-w-2xl text-neutral-600">
                From product modeling to marketplace-ready renders, I create
                clean, premium 3D visuals for e-commerce, ads and websites.
              </p>
            </div>

            <Link
              href="/contact"
              className="w-fit rounded-full bg-black px-7 py-3 text-sm font-semibold text-white"
            >
              Start Project
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-lg font-bold">
                  3D
                </div>

                <h2 className="text-lg font-bold text-black">{item}</h2>

                <p className="mt-3 text-sm leading-6 text-neutral-500">
                  High-quality 3D visuals crafted for luxury product
                  presentation, online stores and marketing campaigns.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}