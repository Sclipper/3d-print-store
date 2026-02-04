import { MetadataRoute } from 'next';
import { getProducts, getCategories } from '@/lib/airtable';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bemu.bg';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all products and categories
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Product pages
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: new Date(product.createdAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...categoryPages];
}
