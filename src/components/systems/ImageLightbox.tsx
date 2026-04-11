"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: (string | StaticImageData)[];
  currentIndex: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onChangeIndex,
}: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0)
        onChangeIndex(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1)
        onChangeIndex(currentIndex + 1);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, images.length, onClose, onChangeIndex]);

  const prev = () => {
    if (currentIndex > 0) onChangeIndex(currentIndex - 1);
  };

  const next = () => {
    if (currentIndex < images.length - 1) onChangeIndex(currentIndex + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full h-full max-w-screen-xl max-h-screen p-4 flex items-center justify-center">
        <Image
          src={images[currentIndex]}
          alt={`System preview ${currentIndex + 1}`}
          className="rounded-2xl"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          style={{ objectFit: "contain" }}
          priority
          onError={() => {}}
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition z-10"
        >
          <X className="h-6 w-6" />
        </button>
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition disabled:opacity-50 z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={next}
              disabled={currentIndex === images.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition disabled:opacity-50 z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
