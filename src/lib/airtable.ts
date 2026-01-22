import Airtable from 'airtable';
import { Product, Category, Order, ProductImage, ShippingAddress } from './types';

// Initialize Airtable
const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = airtable.base(process.env.AIRTABLE_BASE_ID || '');

// Table names
const PRODUCTS_TABLE = 'Products';
const CATEGORIES_TABLE = 'Categories';
const ORDERS_TABLE = 'Orders';

// Extended Airtable attachment type with additional properties
interface ExtendedAttachment extends Airtable.Attachment {
  width?: number;
  height?: number;
  thumbnails?: {
    small: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
    full: { url: string; width: number; height: number };
  };
}

// Helper function to transform Airtable attachment to ProductImage
function transformAttachment(attachment: ExtendedAttachment): ProductImage {
  return {
    id: attachment.id,
    url: attachment.url,
    filename: attachment.filename,
    width: attachment.width,
    height: attachment.height,
    thumbnails: attachment.thumbnails,
  };
}

// Helper function to transform Airtable record to Product
function transformProduct(record: Airtable.Record<Airtable.FieldSet>): Product {
  const fields = record.fields;
  const images = (fields['Images'] as ExtendedAttachment[] | undefined) || [];
  
  return {
    id: record.id,
    name: (fields['Name'] as string) || '',
    slug: (fields['Slug'] as string) || '',
    description: (fields['Description'] as string) || '',
    shortDescription: fields['Short Description'] as string | undefined,
    price: (fields['Price'] as number) || 0,
    compareAtPrice: fields['Compare At Price'] as number | undefined,
    images: images.map(transformAttachment),
    categoryId: (fields['Category'] as string[])?.[0],
    categoryName: fields['Category Name'] as string | undefined,
    inStock: (fields['In Stock'] as boolean) ?? true,
    stockQuantity: (fields['Stock Quantity'] as number) || 0,
    specifications: fields['Specifications'] as string | undefined,
    featured: (fields['Featured'] as boolean) ?? false,
    createdAt: (fields['Created'] as string) || new Date().toISOString(),
  };
}

// Helper function to transform Airtable record to Category
function transformCategory(record: Airtable.Record<Airtable.FieldSet>): Category {
  const fields = record.fields;
  const images = (fields['Image'] as Airtable.Attachment[] | undefined) || [];
  
  return {
    id: record.id,
    name: (fields['Name'] as string) || '',
    slug: (fields['Slug'] as string) || '',
    description: fields['Description'] as string | undefined,
    image: images[0] ? {
      id: images[0].id,
      url: images[0].url,
      filename: images[0].filename,
    } : undefined,
    order: (fields['Order'] as number) || 0,
  };
}

// Get all products
export async function getProducts(options?: {
  categorySlug?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Product[]> {
  const filterFormulas: string[] = [];
  
  if (options?.featured) {
    filterFormulas.push('{Featured} = TRUE()');
  }
  
  if (options?.categorySlug) {
    filterFormulas.push(`{Category Slug} = '${options.categorySlug}'`);
  }
  
  const filterByFormula = filterFormulas.length > 0
    ? `AND(${filterFormulas.join(', ')})`
    : '';

  const records = await base(PRODUCTS_TABLE)
    .select({
      filterByFormula,
      maxRecords: options?.limit || 100,
      sort: [{ field: 'Created', direction: 'desc' }],
    })
    .all();

  return records.map(transformProduct);
}

// Get a single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const records = await base(PRODUCTS_TABLE)
    .select({
      filterByFormula: `{Slug} = '${slug}'`,
      maxRecords: 1,
    })
    .all();

  return records.length > 0 ? transformProduct(records[0]) : null;
}

// Get a single product by ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const record = await base(PRODUCTS_TABLE).find(id);
    return transformProduct(record);
  } catch {
    return null;
  }
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const records = await base(CATEGORIES_TABLE)
    .select({
      sort: [{ field: 'Order', direction: 'asc' }],
    })
    .all();

  return records.map(transformCategory);
}

// Get a single category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const records = await base(CATEGORIES_TABLE)
    .select({
      filterByFormula: `{Slug} = '${slug}'`,
      maxRecords: 1,
    })
    .all();

  return records.length > 0 ? transformCategory(records[0]) : null;
}

// Create an order
export async function createOrder(orderData: {
  orderId: string;
  customerEmail: string;
  customerName: string;
  productId: string;
  quantity: number;
  totalAmount: number;
  shippingAddress: ShippingAddress;
}): Promise<Order> {
  const record = await base(ORDERS_TABLE).create({
    'Order ID': orderData.orderId,
    'Customer Email': orderData.customerEmail,
    'Customer Name': orderData.customerName,
    'Product': [orderData.productId],
    'Quantity': orderData.quantity,
    'Total Amount': orderData.totalAmount,
    'Status': 'paid',
    'Shipping Address': JSON.stringify(orderData.shippingAddress),
  });

  return {
    id: record.id,
    orderId: orderData.orderId,
    customerEmail: orderData.customerEmail,
    customerName: orderData.customerName,
    productId: orderData.productId,
    quantity: orderData.quantity,
    totalAmount: orderData.totalAmount,
    status: 'paid',
    shippingAddress: orderData.shippingAddress,
    createdAt: new Date().toISOString(),
  };
}

// Update order status
export async function updateOrderStatus(
  recordId: string,
  status: Order['status']
): Promise<void> {
  await base(ORDERS_TABLE).update(recordId, {
    'Status': status,
  });
}
