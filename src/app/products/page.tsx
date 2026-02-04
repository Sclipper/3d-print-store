import { Metadata } from 'next';
import { getProducts } from '@/lib/airtable';
import ProductGrid from '@/components/product/ProductGrid';
import Newsletter from '@/components/layout/Newsletter';
import { Product } from '@/lib/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bemu.bg';

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: 'Всички продукти',
  description: 'Разгледайте пълната ни колекция от премиум дизайни. Декорации, играчки и аксесоари с високо качество.',
  alternates: {
    canonical: `${BASE_URL}/products`,
  },
  openGraph: {
    title: 'Всички продукти | Bemu',
    description: 'Разгледайте пълната ни колекция от премиум дизайни.',
    url: `${BASE_URL}/products`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Всички продукти | Bemu',
    description: 'Разгледайте пълната ни колекция от премиум дизайни.',
  },
};

export default async function ProductsPage() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-500">
            <a href="/" className="hover:text-black transition-colors">
              Начало
            </a>
            <span className="mx-2">/</span>
            <span className="text-black">Продукти</span>
          </nav>
        </div>
      </div>

      {/* Products Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-light">Всички продукти</h1>
            <span className="text-sm text-gray-500">
              {products.length} {products.length === 1 ? 'продукт' : 'продукти'}
            </span>
          </div>

          <ProductGrid products={products} columns={3} />
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </>
  );
}
