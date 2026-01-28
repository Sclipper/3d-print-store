import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images[0];
  const hoverImage = product.images[1] || product.images[0];

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-square bg-gray-50 overflow-hidden mb-4">
        {mainImage ? (
          <>
            {/* Main image */}
            <Image
              src={mainImage.url}
              alt={product.name}
              fill
              className="object-contain p-4 transition-opacity duration-300 group-hover:opacity-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Hover image */}
            <Image
              src={hoverImage.url}
              alt={product.name}
              fill
              className="object-contain p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-16 h-16"
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

        {/* Sold out badge */}
        {!product.inStock && (
          <div className="absolute top-4 left-4">
            <span className="text-xs font-medium text-gray-500">Изчерпано</span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-900 group-hover:underline">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              ${product.compareAtPrice.toFixed(2)}
            </span>
          )}
          <span className="text-sm text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}
