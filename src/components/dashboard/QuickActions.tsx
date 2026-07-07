import Link from "next/link";

const actions = [
  {
    title: "Upload Asset",
    href: "/dashboard/upload",
    desc: "Add new 3D model, preview, price and ZIP file.",
  },
  {
    title: "Manage Assets",
    href: "/dashboard/projects",
    desc: "Edit, preview, download or delete marketplace assets.",
  },
  {
    title: "View Store",
    href: "/portfolio",
    desc: "Open public 3D asset marketplace page.",
  },
  {
    title: "Media Library",
    href: "/dashboard/media",
    desc: "Manage thumbnails, renders and asset images.",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-black">Quick Actions</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {actions.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 transition hover:-translate-y-1 hover:border-black hover:bg-white hover:shadow-lg"
          >
            <h3 className="font-bold text-black">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-500">
              {item.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}