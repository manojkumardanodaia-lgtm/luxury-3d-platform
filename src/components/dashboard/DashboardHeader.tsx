export default function DashboardHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
          Creator Dashboard
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-sm text-neutral-500">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          placeholder="Search assets..."
          className="hidden rounded-full border border-neutral-200 bg-neutral-50 px-5 py-3 text-sm text-black outline-none placeholder:text-neutral-400 focus:border-black md:block"
        />

        <button className="rounded-full border border-neutral-200 bg-white px-4 py-3 text-sm shadow-sm">
          🔔
        </button>
      </div>
    </div>
  );
}