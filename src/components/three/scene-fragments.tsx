"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* SCENE 3 — the hero crystal fractured into five fragments.          */
/* Same geometric language (octahedral facets, flat shading), same    */
/* materials and lighting as scene 2. One light pulse circles the     */
/* ring; each fragment it reaches briefly reveals its label.          */
/* Demand frameloop, ticking only while the section is on screen.     */
/* ------------------------------------------------------------------ */

const PURPLE = "#9945ff";
const GREEN = "#14f195";
const CYCLE = 5; // seconds for one full lap of the ring

const NODES = [
  { label: "Analytics", p: [0, 2.15, 0] },
  { label: "Liquidity", p: [-2.05, 0.7, -0.4] },
  { label: "Risk", p: [-1.25, -1.75, 0.3] },
  { label: "Portfolio", p: [1.25, -1.75, -0.3] },
  { label: "Execution", p: [2.05, 0.7, 0.4] },
] as const;

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

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

function Fragments() {
  const group = React.useRef<THREE.Group>(null);
  const pulse = React.useRef<THREE.Mesh>(null);
  const labels = React.useRef<(HTMLDivElement | null)[]>([]);
  const t = React.useRef(0);
  const inView = React.useRef(false);
  const { gl, invalidate } = useThree();

  // only animate while the scene is on screen
  React.useEffect(() => {
    const el = gl.domElement.parentElement;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (entry.isIntersecting) invalidate();
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    const tick = window.setInterval(() => {
      if (inView.current && !document.hidden) invalidate();
    }, 60);
    return () => {
      io.disconnect();
      window.clearInterval(tick);
    };
  }, [gl, invalidate]);

  useFrame((_, dt) => {
    if (!inView.current) return;
    t.current += Math.min(dt, 0.25);
    const time = t.current;

    // entrance: fragments drift out from the crystal's position
    const grow = easeOutCubic(Math.min(Math.max((time - 0.2) / 1.6, 0), 1));
    if (group.current) {
      group.current.scale.setScalar(0.2 + 0.8 * grow);
      group.current.rotation.y += (pointer.x * 0.16 - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (-pointer.y * 0.12 - group.current.rotation.x) * 0.04;
      // parallax drift on the group itself (camera stays put)
      group.current.position.x += (pointer.x * 0.22 - group.current.position.x) * 0.05;
      group.current.position.y += (-pointer.y * 0.16 - group.current.position.y) * 0.05;
    }

    if (grow < 1) return; // pulse starts once assembled

    // travelling pulse along the ring
    const pt = (time - 1.8) % CYCLE;
    const tt = pt < 0 ? pt + CYCLE : pt;
    const edge = Math.floor(tt);
    const l = tt - edge;
    const a = NODES[edge].p;
    const b = NODES[(edge + 1) % 5].p;
    if (pulse.current) {
      pulse.current.position.set(
        a[0] + (b[0] - a[0]) * l,
        a[1] + (b[1] - a[1]) * l,
        a[2] + (b[2] - a[2]) * l
      );
      pulse.current.visible = true;
    }

    // labels fade in as the pulse arrives, then away
    for (let i = 0; i < 5; i++) {
      const el = labels.current[i];
      if (!el) continue;
      const arrive = i === 0 ? CYCLE : i; // fragment i reached at t=i (0 at cycle end)
      let d = tt - arrive;
      if (d < -0.5) d += CYCLE;
      const alpha = d >= 0 && d < 1.1 ? (d < 0.25 ? d / 0.25 : 1 - (d - 0.25) / 0.85) : 0;
      el.style.opacity = String(Math.max(0, Math.min(1, alpha)));
    }
  });

  return (
    <group ref={group}>
      {NODES.map((n, i) => (
        <Fragment key={n.label} node={n} index={i} labelRef={(el) => { labels.current[i] = el; }} />
      ))}
      {/* thin connection paths */}
      {NODES.map((n, i) => {
        const m = NODES[(i + 1) % 5];
        const geo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...n.p),
          new THREE.Vector3(...m.p),
        ]);
        return (
          <line key={`edge-${i}`}>
            <primitive object={geo} attach="geometry" />
            <lineBasicMaterial color={PURPLE} transparent opacity={0.22} />
          </line>
        );
      })}
      {/* the light pulse */}
      <mesh ref={pulse} visible={false}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color={GREEN} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Fragment({
  node,
  index,
  labelRef,
}: {
  node: (typeof NODES)[number];
  index: number;
  labelRef: (el: HTMLDivElement | null) => void;
}) {
  const mesh = React.useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!mesh.current) return;
    const el = mesh.current;
    el.rotation.y += 0.011;
    el.rotation.x += 0.004;
    // local-space bob (the group already sits at the node position)
    el.position.y = Math.sin(el.rotation.y * 2 + index) * 0.07;
  });
  const green = index % 2 === 1;
  return (
    <group position={node.p as unknown as THREE.Vector3Tuple}>
      <mesh ref={mesh} scale={[0.34, 0.5, 0.34]}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={green ? GREEN : PURPLE}
          emissive={green ? GREEN : PURPLE}
          emissiveIntensity={green ? 0.28 : 0.42}
          metalness={0.3}
          roughness={0.2}
          flatShading
          clearcoat={0.6}
          transparent
          opacity={0.94}
        />
      </mesh>
      <Html center position={[0, -0.85, 0]} style={{ pointerEvents: "none" }}>
        <div
          ref={labelRef}
          style={{
            opacity: 0,
            transition: "none",
            fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#f4f5fa",
            textShadow: "0 0 14px rgba(20,241,149,0.45)",
            whiteSpace: "nowrap",
          }}
        >
          {node.label}
        </div>
      </Html>
    </group>
  );
}

export default function SceneFragmentsCanvas() {
  return (
    <Canvas
      frameloop="demand"
      dpr={1}
      camera={{ position: [0, 0, 6.4], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 3.5]} intensity={70} color={PURPLE} decay={1.6} />
      <pointLight position={[-4, -2, -2]} intensity={45} color={GREEN} decay={1.6} />
      <Fragments />
    </Canvas>
  );
}
