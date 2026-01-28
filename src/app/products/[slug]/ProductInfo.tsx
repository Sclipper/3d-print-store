'use client';

import { useState } from 'react';
import { Product } from '@/lib/types';
import QuantitySelector from '@/components/product/QuantitySelector';
import BuyButton from '@/components/product/BuyButton';
import Accordion from '@/components/product/Accordion';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[0]
  );

  const accordionItems = [
    {
      title: 'Описание',
      content: product.description || 'Няма налично описание.',
    },
    {
      title: 'Спецификации',
      content: product.specifications || 'Няма налични спецификации.',
    },
    {
      title: 'Доставка и връщане',
      content: `Доставка: Доставяме по целия свят. Стандартната доставка отнема 5-10 работни дни.

Връщане: Приемаме връщания в рамките на 30 дни от доставката. Продуктите трябва да са неизползвани и в оригинална опаковка.

За всякакви въпроси относно доставката или връщането, моля свържете се с нашия екип за поддръжка.`,
    },
    {
      title: 'Често задавани въпроси',
      content: `В: Какви материали се използват?
О: Нашите продукти са изработени с използване на премиум материали, в зависимост от изискванията на дизайна.

В: Цветовете точно ли са като показаните?
О: Стремим се да показваме цветовете възможно най-точно, но може да има леки вариации поради настройките на монитора.

В: Мога ли да поръчам персонализация?
О: Да! Свържете се с нас за заявки за персонализиран цвят или размер.`,
    },
  ];

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      {/* Product name and price */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-light mb-2">{product.name}</h1>
        <div className="flex items-center gap-3">
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-lg text-gray-500 line-through">
              ${product.compareAtPrice.toFixed(2)}
            </span>
          )}
          <span className="text-lg">${product.price.toFixed(2)}</span>
        </div>
      </div>

      {/* Short description */}
      {product.shortDescription && (
        <p className="text-gray-600 mb-6">{product.shortDescription}</p>
      )}

      {/* Color selector */}
      {product.colors && product.colors.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">
            Цвят: <span className="text-black font-medium">{selectedColor}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 border text-sm transition-colors ${
                  selectedColor === color
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-black'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size selector */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">
            Размер: <span className="text-black font-medium">{selectedSize}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border text-sm transition-colors ${
                  selectedSize === size
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-black'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity selector */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">Количество</label>
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
          max={product.stockQuantity || 99}
          disabled={!product.inStock}
        />
      </div>

      {/* Buy button */}
      <div className="mb-8">
        <BuyButton
          product={product}
          quantity={quantity}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
        />
      </div>

      {/* Accordion sections */}
      <Accordion items={accordionItems} />
    </div>
  );
}
