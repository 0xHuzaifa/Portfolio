"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/** Static low-opacity schematic — fallback for reduced-motion, coarse pointers, low-end devices. */
function StaticSchematic() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full opacity-40"
      aria-hidden="true"
    >
      <g stroke="#3E63DD" strokeOpacity="0.35" strokeWidth="1" fill="none">
        <path d="M200 200 L120 120 M200 200 L210 110 M200 200 L290 130 M200 200 L95 200 M200 200 L310 205 M200 200 L130 280 M200 200 L205 300 M200 200 L280 275" />
        <path d="M120 120 L210 110 M210 110 L290 130 M95 200 L130 280 M130 280 L205 300 M205 300 L280 275" />
      </g>
      <g fill="#3E63DD" fillOpacity="0.7">
        <circle cx="120" cy="120" r="5" />
        <circle cx="210" cy="110" r="5" />
        <circle cx="290" cy="130" r="5" />
        <circle cx="95" cy="200" r="5" />
        <circle cx="310" cy="205" r="5" />
        <circle cx="205" cy="300" r="5" />
        <circle cx="280" cy="275" r="5" />
      </g>
      <circle cx="200" cy="200" r="10" fill="#E08A3C" fillOpacity="0.9" />
      <circle cx="130" cy="280" r="7" fill="#E08A3C" fillOpacity="0.8" />
    </svg>
  );
}

export function SchematicVisual({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"static" | "3d">("static");

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;
    // ponytail: coarse pointer = static fallback; upgrade to reduced-complexity scene if mobile ever needs live 3D
    const lowEnd = (navigator.hardwareConcurrency ?? 8) < 4;
    if (reduced || coarse || lowEnd) return;

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMode("3d");
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {mode === "3d" ? <HeroScene /> : <StaticSchematic />}
    </div>
  );
}
