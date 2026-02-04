import Link from 'next/link';
import { Metadata } from 'next';
import { getProducts, getCategories } from '@/lib/airtable';
import ProductGrid from '@/components/product/ProductGrid';
import Newsletter from '@/components/layout/Newsletter';
import { Product, Category } from '@/lib/types';
import CategoryCard from '@/components/product/CategoryCard';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bemu.bg';

export const metadata: Metadata = {
  title: "Bemu | Премиум дизайни за вашия дом",
  description: "Открийте уникални продукти с високо качество. Декорации, играчки и аксесоари, изработени с прецизност и внимание към детайла в България. Бърза доставка в цялата страна. Пазарувайте онлайн сега!",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Bemu | Премиум дизайни за вашия дом",
    description: "Открийте уникални продукти с високо качество. Декорации, играчки и аксесоари, изработени с прецизност и внимание към детайла в България. Бърза доставка в цялата страна.",
    url: BASE_URL,
  },
};

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
            Премиум Дизайни
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Открийте нашата колекция от красиво изработени дизайни.
            Всяко изделие е създадено с прецизност и грижа.
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Вижте всички продукти
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-light text-center mb-12">Пазарувайте по категория</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
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
              <h2 className="text-2xl font-light">Препоръчани продукти</h2>
              <Link
                href="/products"
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                Вижте всички
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
            <h2 className="text-2xl font-light mb-6">Изработено с прецизност</h2>
            <p className="text-gray-600 leading-relaxed">
              Всеки от нашите продукти е внимателно проектиран и изработен
              с използване на премиум материали. Съчетаваме най-новите технологии
              с артистична визия, за да създадем уникални изделия, които се
              отличават във всяко пространство.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </>
  );
}
