import Airtable from 'airtable';
import { Product, Category, Order, OrderItem, ProductImage, ShippingAddress } from './types';

// Check if Airtable is configured
const isAirtableConfigured = !!(process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID);

// Initialize Airtable (only if configured)
const airtable = isAirtableConfigured 
  ? new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  : null;

const base = airtable?.base(process.env.AIRTABLE_BASE_ID || '');

// Table names
const PRODUCTS_TABLE = 'Products';
const CATEGORIES_TABLE = 'Categories';
const ORDERS_TABLE = 'Orders';
const ORDER_ITEMS_TABLE = 'Order Items';

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

// Helper function to parse variant string (comma or newline separated)
function parseVariantOptions(value: unknown): string[] | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) return value as string[];
  if (typeof value === 'string') {
    // Split by comma or newline and trim whitespace
    const options = value.split(/[,\n]/).map(s => s.trim()).filter(s => s.length > 0);
    return options.length > 0 ? options : undefined;
  }
  return undefined;
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
    colors: parseVariantOptions(fields['Color']),
    sizes: parseVariantOptions(fields['Size']),
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
  categoryId?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Product[]> {
  if (!isAirtableConfigured || !base) {
    throw new Error('Airtable is not configured. Please set AIRTABLE_API_KEY and AIRTABLE_BASE_ID environment variables.');
  }

  const filterFormulas: string[] = [];
  
  if (options?.featured) {
    filterFormulas.push('{Featured} = TRUE()');
  }
  
  // If categorySlug is provided, get the category to find its name for filtering
  let categoryNameToFilter: string | undefined;
  if (options?.categorySlug) {
    const category = await getCategoryBySlug(options.categorySlug);
    if (category) {
      categoryNameToFilter = category.name;
    }
  }
  
  if (categoryNameToFilter) {
    // Filter by category name - ARRAYJOIN on linked fields returns the primary field (name)
    const escapedName = categoryNameToFilter.replace(/'/g, "\\'");
    filterFormulas.push(`FIND('${escapedName}', ARRAYJOIN({Category})) > 0`);
  } else if (options?.categoryId) {
    // If categoryId is provided directly, we can't easily filter by ID in Airtable linked fields
    // The caller should use categorySlug instead
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
  if (!isAirtableConfigured || !base) {
    throw new Error('Airtable is not configured. Please set AIRTABLE_API_KEY and AIRTABLE_BASE_ID environment variables.');
  }

  // Decode URI component and escape single quotes for Airtable formula
  const decodedSlug = decodeURIComponent(slug);
  const escapedSlug = decodedSlug.replace(/'/g, "\\'");

  const records = await base(PRODUCTS_TABLE)
    .select({
      filterByFormula: `{Slug} = '${escapedSlug}'`,
      maxRecords: 1,
    })
    .all();

  return records.length > 0 ? transformProduct(records[0]) : null;
}

// Get a single product by ID
export async function getProductById(id: string): Promise<Product | null> {
  if (!isAirtableConfigured || !base) {
    throw new Error('Airtable is not configured. Please set AIRTABLE_API_KEY and AIRTABLE_BASE_ID environment variables.');
  }

  try {
    const record = await base(PRODUCTS_TABLE).find(id);
    return transformProduct(record);
  } catch {
    return null;
  }
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  if (!isAirtableConfigured || !base) {
    throw new Error('Airtable is not configured. Please set AIRTABLE_API_KEY and AIRTABLE_BASE_ID environment variables.');
  }

  const records = await base(CATEGORIES_TABLE)
    .select({
      sort: [{ field: 'Order', direction: 'asc' }],
    })
    .all();

  return records.map(transformCategory);
}

// Get a single category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!isAirtableConfigured || !base) {
    throw new Error('Airtable is not configured. Please set AIRTABLE_API_KEY and AIRTABLE_BASE_ID environment variables.');
  }

  // Decode URI component and escape single quotes for Airtable formula
  const decodedSlug = decodeURIComponent(slug);
  const escapedSlug = decodedSlug.replace(/'/g, "\\'");

  const records = await base(CATEGORIES_TABLE)
    .select({
      filterByFormula: `{Slug} = '${escapedSlug}'`,
      maxRecords: 1,
    })
    .all();

  return records.length > 0 ? transformCategory(records[0]) : null;
}

// Check if an order already exists by Stripe session ID
export async function getOrderByStripeSessionId(stripeSessionId: string): Promise<Order | null> {
  if (!isAirtableConfigured || !base) {
    throw new Error('Airtable is not configured. Please set AIRTABLE_API_KEY and AIRTABLE_BASE_ID environment variables.');
  }

  const escapedId = stripeSessionId.replace(/'/g, "\\'");
  
  const records = await base(ORDERS_TABLE)
    .select({
      filterByFormula: `{Order ID} = '${escapedId}'`,
      maxRecords: 1,
    })
    .all();

  if (records.length === 0) {
    return null;
  }

  const record = records[0];
  const fields = record.fields;
  
  return {
    id: record.id,
    orderId: (fields['Order ID'] as string) || '',
    customerEmail: (fields['Customer Email'] as string) || '',
    customerName: (fields['Customer Name'] as string) || '',
    totalAmount: (fields['Total Amount'] as number) || 0,
    status: (fields['Status'] as Order['status']) || 'pending',
    shippingAddress: JSON.parse((fields['Shipping Address'] as string) || '{}'),
    createdAt: (fields['Created'] as string) || new Date().toISOString(),
  };
}

// Create an order (order-level information only)
export async function createOrder(orderData: {
  orderId: string;
  customerEmail: string;
  customerName: string;
  totalAmount: number;
  status?: Order['status'];
  shippingAddress: ShippingAddress;
}): Promise<Order> {
  if (!isAirtableConfigured || !base) {
    throw new Error('Airtable is not configured. Please set AIRTABLE_API_KEY and AIRTABLE_BASE_ID environment variables.');
  }

  const status = orderData.status || 'pending';

  // Build the order fields
  // Note: Phone number is included in the Shipping Address JSON field
  const orderFields: Partial<Airtable.FieldSet> = {
    'Order ID': orderData.orderId,
    'Customer Email': orderData.customerEmail,
    'Customer Name': orderData.customerName,
    'Total Amount': orderData.totalAmount,
    'Status': status,
    'Shipping Address': JSON.stringify(orderData.shippingAddress),
  };

  const record = await base(ORDERS_TABLE).create(orderFields as Partial<Airtable.FieldSet>);

  return {
    id: record.id,
    orderId: orderData.orderId,
    customerEmail: orderData.customerEmail,
    customerName: orderData.customerName,
    totalAmount: orderData.totalAmount,
    status,
    shippingAddress: orderData.shippingAddress,
    createdAt: new Date().toISOString(),
  };
}

// Create an order item (one per product in cart)
export async function createOrderItem(itemData: {
  orderRecordId: string; // Record ID from Orders table
  productRecordId: string; // Record ID from Products table
  quantity: number;
  priceEach: number; // Unit price at time of purchase
}): Promise<OrderItem> {
  if (!isAirtableConfigured || !base) {
    throw new Error('Airtable is not configured. Please set AIRTABLE_API_KEY and AIRTABLE_BASE_ID environment variables.');
  }

  const itemFields: Partial<Airtable.FieldSet> = {
    'Order': [itemData.orderRecordId], // Link to Orders table
    'Product': [itemData.productRecordId], // Link to Products table
    'Quantity': itemData.quantity,
    'Price (Each)': itemData.priceEach,
  };

  const record = await base(ORDER_ITEMS_TABLE).create(itemFields as Partial<Airtable.FieldSet>);

  return {
    id: record.id,
    orderId: itemData.orderRecordId,
    productId: itemData.productRecordId,
    quantity: itemData.quantity,
    priceEach: itemData.priceEach,
  };
}

// Create a complete order with all line items
export async function createOrderWithItems(orderData: {
  orderId: string;
  customerEmail: string;
  customerName: string;
  totalAmount: number;
  shippingAddress: ShippingAddress;
  items: {
    productRecordId: string;
    quantity: number;
    priceEach: number;
  }[];
}): Promise<{ order: Order; orderItems: OrderItem[] }> {
  // Step 1: Create the Order record
  const order = await createOrder({
    orderId: orderData.orderId,
    customerEmail: orderData.customerEmail,
    customerName: orderData.customerName,
    totalAmount: orderData.totalAmount,
    status: 'paid', // Payment confirmed via Stripe webhook
    shippingAddress: orderData.shippingAddress,
  });

  // Step 2: Create Order Item records for each product
  const orderItems: OrderItem[] = [];
  for (const item of orderData.items) {
    const orderItem = await createOrderItem({
      orderRecordId: order.id,
      productRecordId: item.productRecordId,
      quantity: item.quantity,
      priceEach: item.priceEach,
    });
    orderItems.push(orderItem);
  }

  return { order, orderItems };
}

// Update order status
export async function updateOrderStatus(
  recordId: string,
  status: Order['status']
): Promise<void> {
  if (!isAirtableConfigured || !base) {
    throw new Error('Airtable is not configured. Please set AIRTABLE_API_KEY and AIRTABLE_BASE_ID environment variables.');
  }

  await base(ORDERS_TABLE).update(recordId, {
    'Status': status,
  });
}
