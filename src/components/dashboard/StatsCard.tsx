type StatsCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
};

export default function StatsCard({
  title,
  value,
  subtitle,
}: StatsCardProps) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
        {title}
      </p>

      <h2 className="mt-4 text-4xl font-bold text-black">{value}</h2>

      {subtitle && <p className="mt-3 text-sm text-neutral-500">{subtitle}</p>}
    </div>
  );
}