"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { registerLaptop } from "@/animations/featured";

/**
 * The opening laptop: a pre-rendered Blender sequence scrubbed by scroll.
 *
 * Frames are drawn to a canvas rather than swapped between <img> elements —
 * one element, one paint per change, no layout work. The sequence is baked
 * linearly so all easing stays in the GSAP timeline.
 *
 * The product shot is rendered ONTO the panel in Blender rather than warped
 * over it in CSS. The CSS route mapped a rectangle onto the screen with a
 * matrix3d homography, and it kept landing left and high of the panel even
 * though the quad was measured correct three separate ways — mesh bounds, an
 * isolated-panel silhouette probe, and texturing the image in Blender. Each
 * attempted fix was another empirical nudge on geometry that already measured
 * right. Blender maps the image through the panel's own UVs and the render
 * camera, so registration is exact by construction rather than by tuning.
 *
 * The trade-off: the screen is no longer live DOM. Changing the artwork means
 * re-rendering the sequence (~12 min via scratchpad/laptop_bk.py --screen), and
 * playing video on the screen would need a different approach again.
 *
 * A static open frame sits underneath as the real element. It is what mobile,
 * reduced-motion and no-JS visitors get, and it holds the layout so the canvas
 * can be absolutely positioned on top without a size of its own.
 */

const FRAME_COUNT = 36;
/** Render dimensions, from the Blender scene. */
const FRAME_W = 1600;
const FRAME_H = 900;

/**
 * JPEG, not PNG or WebP. The renders carry alpha, but at 1600x900 each PNG is
 * ~630KB — 23MB for the sequence. No WebP encoder is available on this machine
 * (no cwebp, sips cannot, ffmpeg built without libwebp), so the frames are
 * flattened onto the section's flat `--beige-1` instead. Same colour, same
 * result, roughly a tenth of the weight.
 *
 * The consequence: this only looks right on a solid beige-1 background. Move
 * the laptop somewhere with a gradient behind it and the frames need re-baking.
 */
const frameUrl = (i: number) =>
  `/laptop/frame_${String(i + 1).padStart(4, "0")}.jpg`;

export function LaptopSequence({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // `window.Image`, not `Image` — the next/image import shadows the DOM
    // constructor in this module.
    const images = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new window.Image();
      img.src = frameUrl(i);
      return img;
    });

    let currentIndex = -1;
    let disposed = false;

    // Contain-fit by hand: the slot's aspect ratio does not match the render's,
    // and stretching a laptop is instantly obvious.
    const paint = (index: number) => {
      const img = images[index];
      if (!img?.complete || !img.naturalWidth) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.min(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight,
      );
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
      currentIndex = index;
    };

    const drawProgress = (progress: number) => {
      const index = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(progress * (FRAME_COUNT - 1))),
      );
      // Scrub fires far faster than the frame index changes.
      if (index !== currentIndex) paint(index);
    };

    const resize = () => {
      if (disposed) return;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      // Capped at 2x: beyond that the file is upscaled anyway and the fill cost
      // is real on every scrub frame.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const index = currentIndex < 0 ? 0 : currentIndex;
      currentIndex = -1; // the surface was cleared by the resize
      paint(index);
    };

    // Paint frame 0 as soon as it lands so the closed lid is there before the
    // section is reached, rather than popping in on first scrub.
    if (images[0].complete) {
      resize();
    } else {
      images[0].addEventListener("load", resize, { once: true });
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const unregister = registerLaptop(drawProgress);

    return () => {
      disposed = true;
      unregister();
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* The real element: carries the alt text, holds the layout, and is what
          mobile, reduced-motion and no-JS visitors see. */}
      <Image
        src={frameUrl(FRAME_COUNT - 1)}
        alt="Real Estate CRM architecture running on a laptop"
        width={FRAME_W}
        height={FRAME_H}
        priority={false}
        className="h-full w-full object-contain"
      />
      {/* Decorative twin, left with no ARIA at all: a canvas counts as
          interactive, so both aria-hidden and role="presentation" are rejected
          on it. It has no accessible content, and the Image above carries the
          description, so there is nothing to hide or relabel. */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
