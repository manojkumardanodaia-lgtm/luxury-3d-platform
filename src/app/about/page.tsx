import Navbar from "@/components/layout/Navbar";

const skills = [
  "Blender",
  "Substance Painter",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "KeyShot",
  "Three.js",
  "React Three Fiber",
  "Next.js",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="px-6 py-32 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          <div>
            <div className="aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-800 to-black" />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.45em] text-neutral-500">
              About LUX3D
            </p>

            <h1 className="mt-4 text-5xl font-semibold">
             Premium 3D Artist & Asset Creator
            </h1>

            <p className="mt-8 text-lg leading-8 text-neutral-600">
              LUX3D is focused on creating premium marketplace-quality 3D assets,
photorealistic product models, Blender scenes, GLB, FBX and OBJ files
for brands, designers and creators worldwide.
            </p>

            <div className="mt-12">
              <h2 className="mb-5 text-2xl font-semibold">
                Software & Skills
              </h2>

              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-neutral-200 bg-neutral-100 px-5 py-2"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <h3 className="text-4xl font-bold">5+</h3>
                <p className="text-neutral-600">Years Experience</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">500+</h3>
                <p className="text-neutral-600">Projects</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">100+</h3>
                <p className="text-neutral-600">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}