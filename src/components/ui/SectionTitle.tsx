import type { ReactNode } from "react";

export default function SectionTitle({
  overline,
  title,
  description,
}: {
  overline: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="mb-12">
      <p className="text-sm uppercase tracking-[0.45em] text-neutral-500">
        {overline}
      </p>

      <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 max-w-3xl text-neutral-400">
          {description}
        </p>
      )}
    </div>
  );
}