"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* The Solana crystal — the visual icon of the product.               */
/* Perf: demand frameloop ticking ~8 fps only while on screen; dpr 1; */
/* low-poly faceted geometry; no post-processing.                     */
/* ------------------------------------------------------------------ */

const PURPLE = "#9945ff";
const VIOLET = "#c05af5";
const GREEN = "#14f195";

/** module-level shared pointer so multiple crystal instances (scene 2
    and the final scene) each get parallax without extra listeners */
const pointer = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true }
  );
}

function Crystal({ scale = 1 }: { scale?: number }) {
  const group = React.useRef<THREE.Group>(null);
  const shell = React.useRef<THREE.Mesh>(null);
  const shards = React.useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  React.useEffect(() => {
    const tick = window.setInterval(() => {
      if (!document.hidden) invalidate();
    }, 125);
    const wake = () => invalidate();
    window.addEventListener("pointermove", wake, { passive: true });
    return () => {
      window.clearInterval(tick);
      window.removeEventListener("pointermove", wake);
    };
  }, [invalidate]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    // slow confident rotation + eased cursor parallax
    g.rotation.y += dt * 0.13;
    g.rotation.x += (pointer.y * 0.28 - g.rotation.x) * 0.05;
    g.rotation.z += (pointer.x * 0.1 - g.rotation.z) * 0.05;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.09; // gentle float
    if (shell.current) shell.current.rotation.y -= dt * 0.07;
    if (shards.current) shards.current.rotation.y -= dt * 0.05;
  });

  // camera parallax — subtle counter-motion for depth.
  // Per-frame mutation of the camera is the standard R3F pattern.
  const { camera, invalidate: inv } = useThree();
  useFrame(() => {
    /* eslint-disable-next-line react-hooks/immutability -- R3F mutates the camera object per frame by design */
    camera.position.x += (pointer.x * 0.55 - camera.position.x) * 0.04;
     
    camera.position.y += (-pointer.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
    inv();
  });

  return (
    <group scale={scale}>
      <group ref={group}>
        {/* faceted glowing core */}
        <mesh scale={[1, 1.5, 1]}>
          <icosahedronGeometry args={[1.05, 0]} />
          <meshPhysicalMaterial
            color={PURPLE}
            emissive={VIOLET}
            emissiveIntensity={0.5}
            metalness={0.35}
            roughness={0.18}
            flatShading
            clearcoat={0.7}
          />
        </mesh>
        {/* glass shell — depth layer */}
        <mesh ref={shell} scale={[1.34, 2, 1.34]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color={GREEN}
            transparent
            opacity={0.1}
            metalness={0.5}
            roughness={0.05}
            flatShading
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
      {/* orbiting shard belt */}
      <group ref={shards}>
        {SHARDS.map((s, i) => (
          <mesh key={i} position={s.p} scale={s.s} rotation={[s.r, s.r * 1.4, 0]}>
            <octahedronGeometry args={[0.15, 0]} />
            <meshStandardMaterial
              color={i % 2 ? GREEN : VIOLET}
              emissive={i % 2 ? GREEN : PURPLE}
              emissiveIntensity={0.55}
              flatShading
            />
          </mesh>
        ))}
      </group>
      <Particles />
    </group>
  );
}

const SHARDS: { p: [number, number, number]; s: number; r: number }[] = [
  { p: [2.0, 0.9, -0.7], s: 1, r: 0.4 },
  { p: [-2.2, -0.5, 0.5], s: 0.8, r: 1.1 },
  { p: [1.1, -1.9, 0.9], s: 0.6, r: 0.7 },
  { p: [-1.4, 1.7, -1.1], s: 0.7, r: 1.6 },
  { p: [2.6, -0.9, 0.2], s: 0.5, r: 0.2 },
];

function makeParticleGeometry() {
  let seed = 0x9e3779b9;
  const rnd = () => {
    seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
    return (seed >>> 0) / 0xffffffff;
  };
  const g = new THREE.BufferGeometry();
  const n = 130;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = 2.4 + rnd() * 3.2;
    const th = rnd() * Math.PI * 2;
    const ph = Math.acos(2 * rnd() - 1);
    pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.75;
    pos[i * 3 + 2] = r * Math.cos(ph) * 0.6;
  }
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  return g;
}
const PARTICLE_GEO = typeof window !== "undefined" ? makeParticleGeometry() : null;

function Particles() {
  if (!PARTICLE_GEO) return null;
  return (
    <>
      <points geometry={PARTICLE_GEO}>
        <pointsMaterial color={GREEN} size={0.03} transparent opacity={0.65} sizeAttenuation />
      </points>
      <points geometry={PARTICLE_GEO} rotation={[0.7, 0.3, 0]}>
        <pointsMaterial color={PURPLE} size={0.024} transparent opacity={0.5} sizeAttenuation />
      </points>
    </>
  );
}

export default function HeroCrystalScene({ scale = 1 }: { scale?: number }) {
  return (
    <Canvas
      frameloop="demand"
      dpr={1}
      camera={{ position: [0, 0, 5.6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 3, 3.5]} intensity={70} color={PURPLE} decay={1.6} />
      <pointLight position={[-4, -2, -2]} intensity={45} color={GREEN} decay={1.6} />
      <pointLight position={[0, 5, -4]} intensity={25} color="#ffffff" decay={2} />
      <Crystal scale={scale} />
    </Canvas>
  );
}
