'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative aspect-[4/3] bg-gray-100 overflow-hidden block"
    >
      {/* Loading skeleton */}
      {isLoading && category.image && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Category image */}
      {category.image && !hasError ? (
        <Image
          src={category.image.url}
          alt={category.name}
          fill
          className={`object-cover transition-all duration-500 ${
            isLoading ? 'opacity-0 scale-100' : 'opacity-100 group-hover:scale-105'
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        /* Fallback placeholder when no image or error */
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-gray-400"
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
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

      {/* Category name */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-xl font-medium text-white">{category.name}</h3>
      </div>
    </Link>
  );
}
