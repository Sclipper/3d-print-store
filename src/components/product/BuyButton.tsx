'use client';

import { useState } from 'react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cart-context';

interface BuyButtonProps {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export default function BuyButton({
  product,
  quantity,
  selectedColor,
  selectedSize,
}: BuyButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!product.inStock) return;

    addItem(
      {
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        price: product.price,
        imageUrl: product.images[0]?.url,
        inStock: product.inStock,
        stockQuantity: product.stockQuantity,
        selectedColor,
        selectedSize,
      },
      quantity
    );
  };

  const handleBuyNow = async () => {
    if (!product.inStock) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              productId: product.id,
              productName: product.name,
              price: product.price,
              quantity,
              imageUrl: product.images[0]?.url,
            },
          ],
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Неуспешно стартиране на плащане. Моля, опитайте отново.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!product.inStock) {
    return (
      <button
        disabled
        className="w-full py-4 bg-gray-200 text-gray-500 text-sm font-medium cursor-not-allowed"
      >
        Изчерпано
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleAddToCart}
        className="w-full py-4 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Добави в количката - ${(product.price * quantity).toFixed(2)}
      </button>
      <button
        onClick={handleBuyNow}
        disabled={isLoading}
        className="w-full py-4 border border-black text-black text-sm font-medium hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Обработка...
          </span>
        ) : (
          'Купи сега'
        )}
      </button>
    </div>
  );
}
