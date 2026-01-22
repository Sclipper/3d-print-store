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

  const accordionItems = [
    {
      title: 'Description',
      content: product.description || 'No description available.',
    },
    {
      title: 'Specifications',
      content: product.specifications || 'No specifications available.',
    },
    {
      title: 'Delivery and Returns',
      content: `Shipping: We ship worldwide. Standard shipping takes 5-10 business days.

Returns: We accept returns within 30 days of delivery. Items must be unused and in original packaging.

For any questions about delivery or returns, please contact our support team.`,
    },
    {
      title: 'FAQ',
      content: `Q: What materials are used?
A: Our products are 3D printed using premium PLA or PETG materials, depending on the design requirements.

Q: Are the colors exactly as shown?
A: We strive to display colors as accurately as possible, but slight variations may occur due to monitor settings.

Q: Can I request customizations?
A: Yes! Contact us for custom color or size requests.`,
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

      {/* Quantity selector */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">Quantity</label>
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
          max={product.stockQuantity || 99}
          disabled={!product.inStock}
        />
      </div>

      {/* Buy button */}
      <div className="mb-8">
        <BuyButton product={product} quantity={quantity} />
      </div>

      {/* Accordion sections */}
      <Accordion items={accordionItems} />
    </div>
  );
}
