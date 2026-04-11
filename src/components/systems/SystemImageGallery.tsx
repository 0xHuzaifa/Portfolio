"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { ImageLightbox } from "./ImageLightbox";

interface SystemImageGalleryProps {
  images: (string | StaticImageData)[];
}

export function SystemImageGallery({ images }: SystemImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const renderImages = () => {
    if (images.length === 1) {
      return (
        <div className="grid grid-cols-1">
          <div
            className="relative w-full h-64 md:h-96 rounded-2xl border border-[hsl(var(--vscode-border))] overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:brightness-110"
            onClick={() => handleImageClick(0)}
          >
            <Image
              src={images[0]}
              alt="System preview"
              fill
              sizes="100vw"
              className="object-cover"
              loading="lazy"
              onError={() => {}}
            />
          </div>
        </div>
      );
    } else if (images.length === 2) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative w-full h-48 md:h-64 rounded-2xl border border-[hsl(var(--vscode-border))] overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:brightness-110"
              onClick={() => handleImageClick(i)}
            >
              <Image
                src={img}
                alt={`System preview ${i + 1}`}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
                onError={() => {}}
              />
            </div>
          ))}
        </div>
      );
    } else if (images.length === 3) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="relative w-full h-48 md:h-64 rounded-2xl border border-[hsl(var(--vscode-border))] overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:brightness-110 md:col-span-2"
            onClick={() => handleImageClick(0)}
          >
            <Image
              src={images[0]}
              alt="System preview 1"
              fill
              sizes="100vw"
              className="object-cover"
              loading="lazy"
              onError={() => {}}
            />
          </div>
          {images.slice(1).map((img, i) => (
            <div
              key={i + 1}
              className="relative w-full h-48 md:h-64 rounded-2xl border border-[hsl(var(--vscode-border))] overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:brightness-110"
              onClick={() => handleImageClick(i + 1)}
            >
              <Image
                src={img}
                alt={`System preview ${i + 2}`}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
                onError={() => {}}
              />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-2 gap-4">
          {images.slice(0, 4).map((img, i) => (
            <div
              key={i}
              className="relative w-full h-48 md:h-64 rounded-2xl border border-[hsl(var(--vscode-border))] overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:brightness-110"
              onClick={() => handleImageClick(i)}
            >
              <Image
                src={img}
                alt={`System preview ${i + 1}`}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
                onError={() => {}}
              />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <section className="rounded-[30px] border border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-sidebar-elevated))]/92 p-6 md:p-8">
        <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[hsl(var(--vscode-text-muted))]">
          System Preview
        </p>
        <div className="mt-4">{renderImages()}</div>
      </section>
      {lightboxOpen && (
        <ImageLightbox
          images={images}
          currentIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
          onChangeIndex={setCurrentIndex}
        />
      )}
    </>
  );
}
