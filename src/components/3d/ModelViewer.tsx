"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Center,
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

function Loader() {
  return (
    <Html center>
      <div className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black">
        Loading 3D...
      </div>
    </Html>
  );
}

function Model({ url }: { url?: string }) {
  if (!url) {
    return (
      <mesh rotation={[0.4, 0.4, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.18} />
      </mesh>
    );
  }

  const gltf = useGLTF(url);

  return (
    <Center>
      <primitive object={gltf.scene} scale={1.8} />
    </Center>
  );
}

export default function ModelViewer({ url }: { url?: string }) {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="relative h-[460px] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#020202]">
      <div className="absolute right-4 top-4 z-10 flex gap-2">
        <button
          onClick={() => setAutoRotate((prev) => !prev)}
          className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black"
        >
          {autoRotate ? "Pause" : "Rotate"}
        </button>
      </div>

      <Canvas
        shadows
        camera={{ position: [4, 3, 6], fov: 40 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#020202"]} />

        <ambientLight intensity={0.7} />
        <directionalLight
          castShadow
          position={[5, 6, 5]}
          intensity={3.5}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <Suspense fallback={<Loader />}>
          <Environment preset="studio" />
          <Model url={url} />
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.45}
            scale={10}
            blur={2.8}
            far={4}
          />
        </Suspense>

        <OrbitControls
          enablePan
          enableZoom
          autoRotate={autoRotate}
          autoRotateSpeed={0.8}
          minDistance={2}
          maxDistance={12}
        />
      </Canvas>
    </div>
  );
}