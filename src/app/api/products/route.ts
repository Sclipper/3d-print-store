import { NextRequest, NextResponse } from 'next/server';
import { getProducts, getProductBySlug } from '@/lib/airtable';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const categorySlug = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';
    const limit = searchParams.get('limit');

    // If slug is provided, return single product
    if (slug) {
      const product = await getProductBySlug(slug);
      
      if (!product) {
        return NextResponse.json(
          { success: false, error: 'Product not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: product });
    }

    // Otherwise return list of products
    const products = await getProducts({
      categorySlug: categorySlug || undefined,
      featured: featured || undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
