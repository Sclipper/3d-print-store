import { NextRequest, NextResponse } from 'next/server';
import { getCategories, getCategoryBySlug } from '@/lib/airtable';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    // If slug is provided, return single category
    if (slug) {
      const category = await getCategoryBySlug(slug);
      
      if (!category) {
        return NextResponse.json(
          { success: false, error: 'Category not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: category });
    }

    // Otherwise return all categories
    const categories = await getCategories();

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
