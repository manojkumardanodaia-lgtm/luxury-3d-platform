"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type UploadDropzoneProps = {
  onFileSelect?: (file: File) => void;
};

export default function UploadDropzone({
  onFileSelect,
}: UploadDropzoneProps) {
  const [fileName, setFileName] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles.at(0);

      if (!file) return;

      setFileName(file.name);
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "model/gltf-binary": [".glb"],
      "model/gltf+json": [".gltf"],
    },
    multiple: false,
    onDrop,
  });

  return (
    <div
      {...(getRootProps() as any)}
      className={`flex min-h-[320px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 transition ${
        isDragActive
          ? "border-white bg-white/10"
          : "border-white/20 bg-white/[0.03]"
      }`}
    >
      <input {...(getInputProps() as any)} />

      <div className="rounded-full bg-white/10 px-5 py-2 text-sm">
        .GLB / .GLTF
      </div>

      <h2 className="mt-6 text-2xl font-semibold">
        Drag & Drop 3D Model
      </h2>

      <p className="mt-3 text-center text-neutral-400">
        Click or drag your 3D model here.
      </p>

      {fileName && (
        <div className="mt-6 rounded-xl border border-green-500/30 bg-green-500/20 px-5 py-3 text-green-300">
          Selected: {fileName}
        </div>
      )}
    </div>
  );
}