const steps = [
  {
    title: "01. Browse",
    text: "Explore premium 3D assets by category, format and project need.",
  },
  {
    title: "02. Preview",
    text: "Check product images, details, formats, license and download type.",
  },
  {
    title: "03. Download",
    text: "Get free assets instantly or purchase premium files securely.",
  },
  {
    title: "04. Use",
    text: "Use Blender, GLB, FBX and OBJ files in websites, ads and product scenes.",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-neutral-50 px-5 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
          How It Works
        </p>

        <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-black sm:text-4xl">
          Simple marketplace flow for premium 3D assets.
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-lg font-bold text-black">{step.title}</h3>

              <p className="mt-4 text-sm leading-6 text-neutral-600">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}