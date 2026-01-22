import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getProducts } from '@/lib/airtable';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from './ProductInfo';
import ProductGrid from '@/components/product/ProductGrid';
import Newsletter from '@/components/layout/Newsletter';
import { Product } from '@/lib/types';

export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | 3D Print Store',
    };
  }

  return {
    title: `${product.name} | 3D Print Store`,
    description: product.shortDescription || product.description,
    openGraph: {
      images: product.images[0]?.url ? [product.images[0].url] : [],
    },
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

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-black transition-colors">
              Home
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
            <h2 className="text-2xl font-light mb-8">You may also like</h2>
            <ProductGrid products={relatedProducts} columns={3} />
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <Newsletter />
    </>
  );
}
