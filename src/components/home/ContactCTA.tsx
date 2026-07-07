import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="px-6 py-24 lg:px-16">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-neutral-200 bg-white shadow-xl p-10 text-center">
        <p className="text-sm uppercase tracking-[0.45em] text-neutral-500">
          Start a Project
        </p>

        <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold">
          Need premium 3D product visuals for your brand?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-neutral-600">
          Let’s create high-quality 3D models, renders, 360° product views and
          e-commerce visuals.
        </p>

        <Link
          href="/contact"className="mt-8 inline-flex rounded-full bg-black px-8 py-3 font-semibold text-white transition hover:bg-neutral-800"
          
        >
          Hire Me
        </Link>
      </div>
    </section>
  );
}