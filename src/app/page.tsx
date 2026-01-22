import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/airtable';
import ProductGrid from '@/components/product/ProductGrid';
import Newsletter from '@/components/layout/Newsletter';
import { Product, Category } from '@/lib/types';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  let featuredProducts: Product[] = [];
  let categories: Category[] = [];

  try {
    [featuredProducts, categories] = await Promise.all([
      getProducts({ featured: true, limit: 6 }),
      getCategories(),
    ]);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-light tracking-tight mb-6">
            Premium 3D Prints
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Discover our collection of beautifully crafted 3D printed designs.
            Each piece is made with precision and care.
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Shop All Products
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-light text-center mb-12">Shop by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group relative aspect-[4/3] bg-gray-100 overflow-hidden"
                >
                  {category.image && (
                    <img
                      src={category.image.url}
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-xl font-medium text-white">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-light">Featured Products</h2>
              <Link
                href="/products"
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                View all
              </Link>
            </div>
            <ProductGrid products={featuredProducts} columns={3} />
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-light mb-6">Crafted with Precision</h2>
            <p className="text-gray-600 leading-relaxed">
              Each of our products is carefully designed and 3D printed using
              premium materials. We combine cutting-edge technology with
              artistic vision to create unique pieces that stand out in any
              space.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </>
  );
}
