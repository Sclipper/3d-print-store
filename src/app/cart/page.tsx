'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart, getCartItemKey } from '@/lib/cart-context';

export default function CartPage() {
  const { cart, removeItem, updateQuantity } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (cart.items.length === 0) return;

    setIsCheckingOut(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
          })),
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
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-black transition-colors">
              Начало
            </Link>
            <span className="mx-2">/</span>
            <span className="text-black">Количка</span>
          </nav>
        </div>
      </div>

      {/* Cart Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-light mb-8">Вашата количка</h1>

          {cart.items.length === 0 ? (
            <div className="text-center py-16">
              <svg
                className="w-24 h-24 text-gray-300 mx-auto mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h2 className="text-xl font-light text-gray-600 mb-4">Количката ви е празна</h2>
              <p className="text-gray-500 mb-8">
                Изглежда, че все още не сте добавили продукти в количката си.
              </p>
              <Link
                href="/products"
                className="inline-block px-8 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Продължете пазаруването
              </Link>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-8">
                <div className="border-b border-gray-200 pb-4 mb-4 hidden sm:grid sm:grid-cols-12 text-sm text-gray-500">
                  <div className="sm:col-span-6">Продукт</div>
                  <div className="sm:col-span-2 text-center">Цена</div>
                  <div className="sm:col-span-2 text-center">Количество</div>
                  <div className="sm:col-span-2 text-right">Общо</div>
                </div>

                <ul className="divide-y divide-gray-200">
                  {cart.items.map((item) => {
                    const itemKey = getCartItemKey(item);
                    return (
                      <li key={itemKey} className="py-6">
                        <div className="sm:grid sm:grid-cols-12 sm:gap-4 flex flex-col gap-4">
                          {/* Product Info */}
                          <div className="sm:col-span-6 flex gap-4">
                            <Link
                              href={`/products/${item.productSlug}`}
                              className="relative w-24 h-24 bg-gray-100 flex-shrink-0"
                            >
                              {item.imageUrl ? (
                                <Image
                                  src={item.imageUrl}
                                  alt={item.productName}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <svg
                                    className="w-8 h-8"
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
                            </Link>
                            <div className="flex flex-col justify-center">
                              <Link
                                href={`/products/${item.productSlug}`}
                                className="font-medium hover:underline"
                              >
                                {item.productName}
                              </Link>
                              {/* Variant info */}
                              {(item.selectedColor || item.selectedSize) && (
                                <p className="text-sm text-gray-500 mt-1">
                                  {[item.selectedColor, item.selectedSize].filter(Boolean).join(' / ')}
                                </p>
                              )}
                              <button
                                onClick={() => removeItem(itemKey)}
                                className="text-sm text-gray-500 hover:text-black mt-2 text-left"
                              >
                                Премахни
                              </button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="sm:col-span-2 flex items-center justify-between sm:justify-center">
                            <span className="sm:hidden text-sm text-gray-500">Цена:</span>
                            <span>${item.price.toFixed(2)}</span>
                          </div>

                          {/* Quantity */}
                          <div className="sm:col-span-2 flex items-center justify-between sm:justify-center">
                            <span className="sm:hidden text-sm text-gray-500">Количество:</span>
                            <div className="flex items-center border border-gray-200">
                              <button
                                onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Намали количеството"
                              >
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 12H4"
                                  />
                                </svg>
                              </button>
                              <span className="w-10 text-center text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                                disabled={item.quantity >= item.stockQuantity}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Увеличи количеството"
                              >
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>

                          {/* Total */}
                          <div className="sm:col-span-2 flex items-center justify-between sm:justify-end">
                            <span className="sm:hidden text-sm text-gray-500">Общо:</span>
                            <span className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="bg-gray-50 p-6">
                  <h2 className="text-lg font-medium mb-4">Обобщение на поръчката</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Междинна сума</span>
                      <span>${cart.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Доставка</span>
                      <span className="text-gray-500">Изчислява се при плащане</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between text-base font-medium">
                      <span>Общо</span>
                      <span>${cart.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full mt-6 py-4 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isCheckingOut ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
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
                      'Продължи към плащане'
                    )}
                  </button>
                  <Link
                    href="/products"
                    className="block text-center mt-4 text-sm text-gray-600 hover:text-black"
                  >
                    Продължете пазаруването
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
