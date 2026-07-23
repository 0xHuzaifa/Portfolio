"use client";

import { useGSAP } from "@gsap/react";
import { Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { Group } from "three";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COOL = "#3E63DD";
const WARM = "#E08A3C";

// Schematic node layout — loosely a system architecture diagram:
// client tier (top), API hub (center), services (mid ring), data tier (bottom)
const nodes: Array<{
  pos: [number, number, number];
  warm?: boolean;
  r?: number;
}> = [
  { pos: [0, 0, 0], warm: true, r: 0.16 }, // API hub
  { pos: [-1.6, 1.2, 0.3] },
  { pos: [0.2, 1.5, -0.4] },
  { pos: [1.7, 1.1, 0.2] },
  { pos: [-2.1, 0, -0.3] },
  { pos: [2.2, 0.1, -0.5] },
  { pos: [-1.4, -1.2, 0.4], warm: true, r: 0.12 }, // jobs queue
  { pos: [0.1, -1.6, -0.2] },
  { pos: [1.5, -1.3, 0.5] },
  { pos: [-0.8, 0.7, 0.8] },
  { pos: [0.9, -0.5, 0.9] },
  { pos: [-0.3, -0.7, -0.9] },
];

// Edges: hub-and-spoke plus a few cross-links
const edges: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [0, 7],
  [0, 8],
  [0, 9],
  [0, 10],
  [0, 11],
  [1, 2],
  [2, 3],
  [4, 6],
  [6, 7],
  [7, 8],
  [5, 8],
  [9, 10],
];

function Schematic() {
  const group = useRef<Group>(null);

  // Slow deliberate rotation — performs, doesn't wobble
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.06;
  });

  // Scroll scrub: hero scroll-out tilts and recedes the schematic
  useGSAP(() => {
    if (!group.current) return;
    gsap.to(group.current.rotation, {
      x: 0.55,
      scrollTrigger: { start: 0, end: 700, scrub: 1 },
    });
    gsap.to(group.current.position, {
      z: -1.4,
      y: 0.6,
      scrollTrigger: { start: 0, end: 700, scrub: 1 },
    });
  });

  return (
    <group ref={group} rotation={[0.15, -0.4, 0]}>
      {edges.map(([a, b]) => (
        <Line
          key={`${a}-${b}`}
          points={[nodes[a].pos, nodes[b].pos]}
          color={COOL}
          transparent
          opacity={0.28}
          lineWidth={1}
        />
      ))}
      {nodes.map((node, i) => (
        <mesh key={String(i)} position={node.pos}>
          <sphereGeometry args={[node.r ?? 0.07, 16, 16]} />
          <meshBasicMaterial
            color={node.warm ? WARM : COOL}
            transparent
            opacity={node.warm ? 0.95 : 0.75}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Schematic />
    </Canvas>
  );
}
