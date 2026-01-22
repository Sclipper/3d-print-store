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
  productId: string;
  productName?: string;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  shippingAddress: ShippingAddress;
  createdAt: string;
}

export interface ShippingAddress {
  name: string;
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

// Checkout Types
export interface CheckoutRequest {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface CheckoutResponse {
  sessionId: string;
  url: string;
}
