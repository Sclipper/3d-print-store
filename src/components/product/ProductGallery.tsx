'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ProductImage } from '@/lib/types';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

const ImagePlaceholder = ({ size = 'large' }: { size?: 'large' | 'small' }) => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
    <svg
      className={size === 'large' ? 'w-24 h-24' : 'w-8 h-8'}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  </div>
);

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [thumbnailErrors, setThumbnailErrors] = useState<Set<number>>(new Set());

  const handleMainLoad = () => {
    setIsLoading(false);
  };

  const handleMainError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleThumbnailError = (index: number) => {
    setThumbnailErrors((prev) => new Set(prev).add(index));
  };

  // Reset loading state when changing images
  const handleImageChange = (index: number) => {
    setSelectedIndex(index);
    setIsLoading(true);
    setHasError(false);
  };

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-gray-50 flex items-center justify-center">
        <svg
          className="w-24 h-24 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {/* Loading skeleton */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}

        {hasError ? (
          <ImagePlaceholder size="large" />
        ) : (
          <Image
            src={selectedImage.url}
            alt={`${productName} - Image ${selectedIndex + 1}`}
            fill
            className={`object-contain p-8 transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            onLoad={handleMainLoad}
            onError={handleMainError}
          />
        )}
      </div>

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => handleImageChange(index)}
              className={`relative w-16 h-16 flex-shrink-0 bg-gray-50 overflow-hidden transition-all ${
                index === selectedIndex
                  ? 'ring-2 ring-black'
                  : 'ring-1 ring-gray-200 hover:ring-gray-400'
              }`}
            >
              {thumbnailErrors.has(index) ? (
                <ImagePlaceholder size="small" />
              ) : (
                <Image
                  src={image.thumbnails?.small?.url || image.url}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-contain p-1"
                  sizes="64px"
                  onError={() => handleThumbnailError(index)}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Navigation arrows for mobile */}
      {images.length > 1 && (
        <div className="flex justify-center gap-4 sm:hidden">
          <button
            onClick={() => setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
            className="p-2 border border-gray-200 hover:border-black transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="flex items-center text-sm text-gray-500">
            {selectedIndex + 1} / {images.length}
          </span>
          <button
            onClick={() => setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
            className="p-2 border border-gray-200 hover:border-black transition-colors"
            aria-label="Next image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
