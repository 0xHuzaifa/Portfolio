"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { ImageLightbox } from "./ImageLightbox";

/**
 * The screenshot wall beside the feature list.
 *
 * A page of four at a time, paged rather than scrolled: the reference shows a
 * fixed 2x2 block with arrows, and a horizontal scroller in that slot would
 * fight the page's own vertical scroll on a trackpad.
 *
 * Replaced `SystemImageGallery`, which carried its own "System Preview" chrome
 * and dark frame — a second visual language inside a section that already has
 * one. This keeps the lightbox and drops the frame.
 */

const PER_PAGE = 4;

export function SystemShots({
  images,
  title,
}: {
  images: (string | StaticImageData)[];
  title: string;
}) {
  const [page, setPage] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const pages = Math.ceil(images.length / PER_PAGE);
  const start = page * PER_PAGE;
  const shown = images.slice(start, start + PER_PAGE);

  return (
    <>
      <div className="flex items-center justify-between gap-6">
        <h2 className="text-[26px] font-extrabold tracking-[-0.03em] lg:text-[30px]">
          Screenshots
        </h2>

        {pages > 1 && (
          <div className="flex items-center gap-[10px]">
            <button
              type="button"
              onClick={() => setPage((n) => n - 1)}
              disabled={page === 0}
              aria-label="Previous screenshots"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[var(--ink-a12)] transition-[background-color,opacity] duration-200 hover:bg-[var(--ink-a04)] disabled:pointer-events-none disabled:opacity-35"
            >
              <ArrowLeft className="h-[17px] w-[17px]" strokeWidth={1.9} />
            </button>
            <button
              type="button"
              onClick={() => setPage((n) => n + 1)}
              disabled={page >= pages - 1}
              aria-label="More screenshots"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[hsl(var(--ink-1))] text-[hsl(var(--paper))] transition-opacity duration-200 hover:opacity-85 disabled:pointer-events-none disabled:opacity-35"
            >
              <ArrowRight className="h-[17px] w-[17px]" strokeWidth={1.9} />
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {shown.map((image, i) => (
          <button
            key={typeof image === "string" ? image : image.src}
            type="button"
            onClick={() => setLightbox(start + i)}
            className="group overflow-hidden rounded-[14px] border border-[var(--ink-a12)] bg-[hsl(var(--beige-2))] transition-[transform,box-shadow] duration-300 ease-[var(--ease)] hover:-translate-y-[3px] hover:shadow-[var(--shadow-sm)]"
          >
            <Image
              src={image}
              alt={`${title} — screenshot ${start + i + 1}`}
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-[var(--ease)] group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <ImageLightbox
          images={images}
          currentIndex={lightbox}
          onClose={() => setLightbox(null)}
          onChangeIndex={setLightbox}
        />
      )}
    </>
  );
}
