"use client";

import { useEffect, useState } from "react";

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const loadMedia = async () => {
    const res = await fetch("/api/media");
    const data = await res.json();
    setMedia(data.media || []);
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const upload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("title", title);

    const res = await fetch("/api/media", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    setLoading(false);

    if (result.success) {
      setFile(null);
      setTitle("");
      loadMedia();
      alert("Media uploaded");
    } else {
      alert(result.message || "Upload failed");
    }
  };

  const filteredMedia = media.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.fileType?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "all" || item.fileType === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="px-6 py-28 text-white">
      <h1 className="text-4xl font-semibold">Media Library</h1>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
          placeholder="Media title"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
        />

        <button
          onClick={upload}
          disabled={loading}
          className="rounded-full bg-white px-6 py-3 font-semibold text-black disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Media"}
        </button>
      </div>

      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search media..."
          className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
        >
          <option value="all">All</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
          <option value="raw">GLB / 3D</option>
        </select>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {filteredMedia.map((item) => (
          <div
            key={item._id}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]"
          >
            {item.fileType === "image" ? (
              <img
                src={item.url}
                alt={item.title}
                className="h-52 w-full object-cover"
              />
            ) : (
              <div className="flex h-52 items-center justify-center bg-black text-neutral-400">
                {item.fileType}
              </div>
            )}

            <div className="p-4">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="mt-1 text-xs text-neutral-500">{item.fileType}</p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(item.url);
                    alert("URL copied");
                  }}
                  className="rounded-full border border-white/10 px-4 py-2 text-xs text-neutral-300"
                >
                  Copy URL
                </button>

                <button
                  onClick={async () => {
                    if (!confirm("Delete media?")) return;

                    const res = await fetch(`/api/media/${item._id}`, {
                      method: "DELETE",
                    });

                    const data = await res.json();

                    if (data.success) {
                      loadMedia();
                    } else {
                      alert(data.message || "Delete failed");
                    }
                  }}
                  className="rounded-full border border-red-500/30 px-4 py-2 text-xs text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}