import Link from "next/link";

type Project = {
  _id: string;
  name: string;
  category?: string;
  status?: string;
  thumbnail?: string;
};

export default function RecentProjects({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">Recent Assets</h2>

        <Link
          href="/dashboard/projects"
          className="text-sm font-semibold text-neutral-500 hover:text-black"
        >
          View All →
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">
          <p className="font-semibold text-black">No assets uploaded yet.</p>
          <p className="mt-2 text-sm text-neutral-500">
            Upload your first 3D asset to start building your marketplace.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {projects.slice(0, 5).map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-3"
            >
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="h-16 w-16 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-neutral-200 text-xs text-neutral-500">
                  3D
                </div>
              )}

              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-1 font-bold text-black">
                  {item.name}
                </h3>

                <p className="text-sm text-neutral-500">
                  {item.category || "3D Asset"}
                </p>
              </div>

              <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-600">
                {item.status || "Draft"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}