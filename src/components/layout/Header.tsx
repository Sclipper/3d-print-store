'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Category } from '@/lib/types';
import { useCart } from '@/lib/cart-context';

interface HeaderProps {
  categories?: Category[];
}

export default function Header({ categories = [] }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { cart, openCart } = useCart();
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Отвори меню"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Bemu"
              width={192}
              height={64}
              className="h-16 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Начало
            </Link>
            <Link
              href="/organiziro"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Система Организиро
            </Link>
            <Link
              href="/products"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Всички продукти
            </Link>
            
            {/* Categories Dropdown */}
            {categories.length > 0 && (
              <div className="relative" ref={categoriesRef}>
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Категории
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div
                  onMouseLeave={() => setIsCategoriesOpen(false)}
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                    isCategoriesOpen 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-2'
                  }`}
                >
                  <div className="bg-white border border-gray-100 shadow-lg min-w-[220px] py-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="block px-5 py-2.5 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                        onClick={() => setIsCategoriesOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2"
              aria-label="Търсене"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button
              onClick={openCart}
              className="p-2 relative"
              aria-label="Отвори количка"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                  {cart.totalItems > 99 ? '99+' : cart.totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-100">
            <form className="relative">
              <input
                type="text"
                placeholder="Търсене..."
                className="w-full px-4 py-2 border border-gray-200 rounded-none focus:outline-none focus:border-black transition-colors"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-100">
          <nav className="px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block text-sm text-gray-600 hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Начало
            </Link>
            <Link
              href="/organiziro"
              className="block text-sm text-gray-600 hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Система Организиро
            </Link>
            <Link
              href="/products"
              className="block text-sm text-gray-600 hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Всички продукти
            </Link>
            
            {/* Mobile Categories Section */}
            {categories.length > 0 && (
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                  Категории
                </p>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      className="block text-sm text-gray-600 hover:text-black"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
