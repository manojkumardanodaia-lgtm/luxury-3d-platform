"use client";

import { useState } from "react";

export default function ImageUploadBox({
  onFileSelect,
}: {
  onFileSelect: (file: File) => void;
}) {
  const [preview, setPreview] = useState("");

  const handleFile = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select image file only");
      return;
    }

    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files?.[0]);
      }}
      className="flex min-h-[260px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-white/20 bg-white/[0.03] p-6 text-center"
    >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files?.[0])}
        className="hidden"
        id="thumbnail-upload"
      />

      <label htmlFor="thumbnail-upload" className="w-full cursor-pointer">
        {preview ? (
          <img
            src={preview}
            alt="Thumbnail preview"
            className="h-60 w-full rounded-2xl object-cover"
          />
        ) : (
          <div>
            <div className="mx-auto mb-4 w-fit rounded-full bg-white/10 px-5 py-2 text-sm">
              JPG / PNG / WEBP
            </div>

            <h2 className="text-2xl font-semibold">Upload Thumbnail</h2>

            <p className="mt-3 text-sm text-neutral-400">
              Drag image here or click to choose.
            </p>
          </div>
        )}
      </label>
    </div>
  );
}