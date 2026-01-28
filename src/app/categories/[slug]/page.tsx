import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryBySlug, getProducts } from '@/lib/airtable';
import ProductGrid from '@/components/product/ProductGrid';
import Newsletter from '@/components/layout/Newsletter';

export const revalidate = 60;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Категорията не е намерена | 3D Принт Магазин',
    };
  }

  return {
    title: `${category.name} | 3D Принт Магазин`,
    description: category.description || `Browse our ${category.name} collection.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts({ categorySlug: slug });
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

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
            <span className="text-black">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      {category.image && (
        <div className="relative h-64 lg:h-80 bg-gray-100">
          <img
            src={category.image.url}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl lg:text-4xl font-light mb-2">{category.name}</h1>
              {category.description && (
                <p className="text-white/80 max-w-xl mx-auto px-4">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!category.image && (
            <div className="mb-8">
              <h1 className="text-3xl font-light mb-2">{category.name}</h1>
              {category.description && (
                <p className="text-gray-600">{category.description}</p>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mb-8">
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
