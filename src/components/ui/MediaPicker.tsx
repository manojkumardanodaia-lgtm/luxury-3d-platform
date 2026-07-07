"use client";

import { useEffect, useState } from "react";

export default function MediaPicker({
  onSelect,
}: {
  onSelect: (url: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState<any[]>([]);

  const loadMedia = async () => {
    const res = await fetch("/api/media");
    const data = await res.json();
    setMedia(data.media || []);
  };

  useEffect(() => {
    if (open) loadMedia();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-white/10 px-5 py-3 text-sm"
      >
        Choose From Media
      </button>

      {open && (
        <div className="fixed inset-0 z-[999] bg-black/80 p-6">
          <div className="mx-auto max-h-[90vh] max-w-5xl overflow-auto rounded-3xl border border-white/10 bg-[#080808] p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Select Media</h2>

              <button onClick={() => setOpen(false)}>Close</button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {media
                .filter((item) => item.fileType === "image")
                .map((item) => (
                  <button
                    key={item._id}
                    onClick={() => {
                      onSelect(item.url);
                      setOpen(false);
                    }}
                    className="overflow-hidden rounded-2xl border border-white/10 text-left"
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-3 text-sm">{item.title}</div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}