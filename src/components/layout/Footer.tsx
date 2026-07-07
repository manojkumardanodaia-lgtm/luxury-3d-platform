import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white px-5 py-10 text-neutral-900 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-wide text-black">LUX3D</h2>
          <p className="mt-2 text-sm text-neutral-500">
            Premium 3D asset marketplace for product visualization.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-sm font-semibold text-neutral-600">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <Link href="/portfolio" className="hover:text-black">
            Assets
          </Link>
          <Link href="/contact" className="hover:text-black">
            Hire Me
          </Link>
        </div>
      </div>
    </footer>
  );
}