"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const [form, setForm] = useState<any>({
    name: "",
    category: "",
    description: "",
    status: "Draft",
    featured: "false",
    softwareUsed: "",
    projectYear: "",
    tags: "",
    videoUrl: "",
    thumbnail: "",
    galleryImages: [],
    price: 0,
    isFree: "true",
    downloadType: "Free",
    downloadZipUrl: "",
    license: "",
  });

  const update = (key: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/media", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    return data.url || data.media?.url || data.media?.secure_url || data.secure_url;
  };

  const uploadThumbnail = async (file: File) => {
    const url = await uploadImage(file);
    if (url) update("thumbnail", url);
  };

  const uploadGallery = async (files: FileList | null) => {
    if (!files) return;

    const urls: string[] = [];

    for (const file of Array.from(files)) {
      const url = await uploadImage(file);
      if (url) urls.push(url);
    }

    update("galleryImages", [...form.galleryImages, ...urls]);
  };

  const removeGalleryImage = (url: string) => {
    update(
      "galleryImages",
      form.galleryImages.filter((x: string) => x !== url)
    );
  };

  useEffect(() => {
    const loadProject = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      const catRes = await fetch("/api/categories");
      const catData = await catRes.json();

      if (catData.success) setCategories(catData.categories || []);

      if (data.success && data.product) {
        const p = data.product;

        setForm({
          name: p.name || "",
          category: p.category || "",
          description: p.description || "",
          status: p.status || "Draft",
          featured: String(p.featured || false),
          softwareUsed: Array.isArray(p.softwareUsed)
            ? p.softwareUsed.join(", ")
            : p.softwareUsed || "",
          projectYear: p.projectYear || "",
          tags: Array.isArray(p.tags) ? p.tags.join(", ") : p.tags || "",
          videoUrl: p.videoUrl || "",
          thumbnail: p.thumbnail || "",
          galleryImages: Array.isArray(p.galleryImages) ? p.galleryImages : [],
          price: p.price || 0,
         isFree: String(p.isFree ?? true),
         downloadType: p.downloadType || "Free",
         downloadZipUrl: p.downloadZipUrl || "",
            license: p.license || "",
        });
      }

      setLoading(false);
    };

    loadProject();
  }, [id]);

  const saveProject = async () => {
    setSaving(true);

    const payload = {
      ...form,
      featured: form.featured === "true",
      softwareUsed: form.softwareUsed
        .split(",")
        .map((x: string) => x.trim())
        .filter(Boolean),
      tags: form.tags
        .split(",")
        .map((x: string) => x.trim())
        .filter(Boolean),
    };

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setSaving(false);

    if (data.success) {
      alert("Project updated");
      router.push("/dashboard/projects");
    } else {
      alert(data.message || "Update failed");
    }
  };

  if (loading) return <div className="px-6 py-28 text-white">Loading...</div>;

  return (
    <div className="min-h-screen px-6 py-28 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm uppercase tracking-[0.4em] text-neutral-500">
          Edit Project
        </p>

        <h1 className="text-4xl font-semibold">Project Details</h1>

        <div className="mt-10 grid gap-6">
          <input value={form.name} onChange={(e) => update("name", e.target.value)} className="rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none" placeholder="Project name" />

          <select value={form.category} onChange={(e) => update("category", e.target.value)} className="rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none">
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {"— ".repeat(cat.level)} {cat.name}
              </option>
            ))}
          </select>

          <textarea value={form.description} onChange={(e) => update("description", e.target.value)} className="h-40 rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none" placeholder="Project description" />

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="mb-3 font-semibold">Main Image</p>

            {form.thumbnail && (
              <img src={form.thumbnail} className="mb-4 h-40 w-40 rounded-2xl object-cover" />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && uploadThumbnail(e.target.files[0])}
              className="block w-full rounded-2xl border border-dashed border-white/20 p-5"
            />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="mb-3 font-semibold">Gallery Images</p>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => uploadGallery(e.target.files)}
              className="block w-full rounded-2xl border border-dashed border-white/20 p-5"
            />

            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {form.galleryImages.map((img: string) => (
                <div key={img} className="relative">
                  <img src={img} className="h-32 w-full rounded-2xl object-cover" />
                  <button
                    onClick={() => removeGalleryImage(img)}
                    className="absolute right-2 top-2 rounded-full bg-red-600 px-3 py-1 text-xs"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          <input value={form.softwareUsed} onChange={(e) => update("softwareUsed", e.target.value)} className="rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none" placeholder="Software used" />
          <input value={form.projectYear} onChange={(e) => update("projectYear", e.target.value)} className="rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none" placeholder="Project year" />
          <input value={form.tags} onChange={(e) => update("tags", e.target.value)} className="rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none" placeholder="Tags comma separated" />
          <input value={form.videoUrl} onChange={(e) => update("videoUrl", e.target.value)} className="rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none" placeholder="Video URL" />

          <input value={form.price} onChange={(e) => update("price", e.target.value)} className="rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none" placeholder="Price" />

          <select value={form.isFree} onChange={(e) => update("isFree", e.target.value)} className="rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none">
          <option value="true">Free Download</option>
          <option value="false">Paid Download</option>
          </select>

<input value={form.downloadZipUrl} onChange={(e) => update("downloadZipUrl", e.target.value)} className="rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none" placeholder="Download ZIP URL" />

<input value={form.license} onChange={(e) => update("license", e.target.value)} className="rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none" placeholder="License e.g. Personal / Commercial" />

          <select value={form.status} onChange={(e) => update("status", e.target.value)} className="rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none">
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>

          <select value={form.featured} onChange={(e) => update("featured", e.target.value)} className="rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none">
            <option value="false">Not Featured</option>
            <option value="true">Featured</option>
          </select>

          <button onClick={saveProject} disabled={saving} className="rounded-full bg-white px-8 py-4 font-semibold text-black disabled:opacity-50">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}