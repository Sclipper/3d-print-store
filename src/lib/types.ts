// Product Types
export interface ProductImage {
  id: string;
  url: string;
  filename: string;
  width?: number;
  height?: number;
  thumbnails?: {
    small: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
    full: { url: string; width: number; height: number };
  };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  categoryId?: string;
  categoryName?: string;
  inStock: boolean;
  stockQuantity: number;
  specifications?: string;
  featured: boolean;
  createdAt: string;
  colors?: string[];
  sizes?: string[];
  seoKeywords?: string;
}

// Category Types
export interface CategoryImage {
  id: string;
  url: string;
  filename: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: CategoryImage;
  order: number;
}

// Order Types
export interface Order {
  id: string;
  orderId: string;
  customerEmail: string;
  customerName: string;
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  shippingAddress: ShippingAddress;
  createdAt: string;
}

// Order Item Types (one record per product in cart)
export interface OrderItem {
  id: string;
  orderId: string; // Record ID linking to Orders table
  productId: string; // Record ID linking to Products table
  quantity: number;
  priceEach: number; // Price at time of purchase
}

export interface ShippingAddress {
  name: string;
  phone?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Cart Types
export interface CartItem {
  productId: string;
  productName: string;
  productSlug: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  inStock: boolean;
  stockQuantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Organiziro Types
export interface OrganiziroProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: ProductImage[];
  inStock: boolean;
  stockQuantity: number;
  specifications?: string;
  category?: string; // 'grid' or 'box'
  // Grid dimensions parsed from slug (e.g., 'grid-base-organiziro-2x5' -> width: 2, height: 5)
  gridWidth?: number;
  gridHeight?: number;
}

// Checkout Types
export interface CheckoutRequest {
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    imageUrl?: string;
  }[];
}

export interface CheckoutResponse {
  sessionId: string;
  url: string;
}
