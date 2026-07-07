const skills = [
  "Blender",
  "Substance Painter",
  "Photoshop",
  "Illustrator",
  "KeyShot",
  "React Three Fiber",
  "Three.js",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Cloudinary",
  "MongoDB",
];

export default function SkillsSection() {
  return (
    <section className="bg-white px-5 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
          Tools & Formats
        </p>

        <h2 className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-4xl">
          Built with professional 3D workflow.
        </h2>

        <div className="mt-10 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <div
              key={skill}
              className="rounded-full border border-neutral-200 bg-neutral-50 px-5 py-2.5 text-sm font-semibold text-neutral-700 transition hover:border-black hover:bg-white"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}