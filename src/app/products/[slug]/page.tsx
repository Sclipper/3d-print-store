import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getProductBySlug, getProducts } from '@/lib/airtable';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from './ProductInfo';
import ProductGrid from '@/components/product/ProductGrid';
import Newsletter from '@/components/layout/Newsletter';
import { Product } from '@/lib/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bemu.bg';

export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Продуктът не е намерен | Bemu',
    };
  }

  const description = product.shortDescription || product.description?.slice(0, 160);
  const productUrl = `${BASE_URL}/products/${product.slug}`;
  const productImage = product.images[0];

  return {
    title: product.name,
    description,
    keywords: product.seoKeywords,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${product.name} | Bemu`,
      description,
      url: productUrl,
      type: 'website',
      images: productImage ? [
        {
          url: productImage.url,
          width: productImage.width || 1200,
          height: productImage.height || 630,
          alt: product.name,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Bemu`,
      description,
      images: productImage ? [productImage.url] : [],
    },
  };
}

// Generate Product JSON-LD schema
function generateProductJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((img) => img.url),
    ...(product.seoKeywords && { keywords: product.seoKeywords }),
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'BGN',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${BASE_URL}/products/${product.slug}`,
    },
    ...(product.categoryName && { category: product.categoryName }),
  };
}

// Generate Breadcrumb JSON-LD schema
function generateBreadcrumbJsonLd(product: Product) {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Начало',
      item: BASE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Продукти',
      item: `${BASE_URL}/products`,
    },
  ];

  if (product.categoryName) {
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: product.categoryName,
      item: `${BASE_URL}/categories/${product.categoryId}`,
    });
    items.push({
      '@type': 'ListItem',
      position: 4,
      name: product.name,
      item: `${BASE_URL}/products/${product.slug}`,
    });
  } else {
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: product.name,
      item: `${BASE_URL}/products/${product.slug}`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products (same category or featured)
  let relatedProducts: Product[] = [];
  try {
    const allProducts = await getProducts({ limit: 4 });
    relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 3);
  } catch (error) {
    console.error('Failed to fetch related products:', error);
  }

  const productJsonLd = generateProductJsonLd(product);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(product);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
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
            {product.categoryName && (
              <>
                <Link
                  href={`/categories/${product.categoryId}`}
                  className="hover:text-black transition-colors"
                >
                  {product.categoryName}
                </Link>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-black">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Gallery */}
            <ProductGallery images={product.images} productName={product.name} />

            {/* Product Info */}
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-light mb-8">Може да харесате също</h2>
            <ProductGrid products={relatedProducts} columns={3} />
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <Newsletter />
    </>
  );
}
