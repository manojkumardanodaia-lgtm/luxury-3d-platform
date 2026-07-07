export default function EmptyState({
  title,
}: {
  title: string;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-white/10 p-16 text-center">
      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-4 text-neutral-400">
        Nothing available yet.
      </p>
    </div>
  );
}