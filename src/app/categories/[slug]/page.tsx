import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getCategoryBySlug, getProducts } from '@/lib/airtable';
import ProductGrid from '@/components/product/ProductGrid';
import Newsletter from '@/components/layout/Newsletter';
import { Category } from '@/lib/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bemu.bg';

export const revalidate = 60;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Категорията не е намерена | Bemu',
    };
  }

  const description = category.description || `Разгледайте нашата колекция ${category.name}. Премиум продукти с високо качество.`;
  const categoryUrl = `${BASE_URL}/categories/${category.slug}`;

  return {
    title: category.name,
    description,
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      title: `${category.name} | Bemu`,
      description,
      url: categoryUrl,
      type: 'website',
      images: category.image ? [
        {
          url: category.image.url,
          alt: category.name,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} | Bemu`,
      description,
      images: category.image ? [category.image.url] : [],
    },
  };
}

// Generate Breadcrumb JSON-LD schema
function generateBreadcrumbJsonLd(category: Category) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Начало',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category.name,
        item: `${BASE_URL}/categories/${category.slug}`,
      },
    ],
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

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(category);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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
