import { Product, Category } from './types';

export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Table Lamps',
    slug: 'table-lamps',
    description: 'Elegant 3D printed table lamps that bring warmth and style to any room.',
    order: 1,
  },
  {
    id: 'cat-2',
    name: 'Vases',
    slug: 'vases',
    description: 'Modern geometric vases crafted with precision 3D printing technology.',
    order: 2,
  },
  {
    id: 'cat-3',
    name: 'Desk Accessories',
    slug: 'desk-accessories',
    description: 'Functional and beautiful accessories to organize your workspace.',
    order: 3,
  },
];

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Spiral Wave Lamp',
    slug: 'spiral-wave-lamp',
    description: `The Spiral Wave Lamp is inspired by the natural flow of ocean waves, captured in a mesmerizing spiral form. Each layer of the design creates beautiful light patterns when illuminated.

Crafted using premium PLA material, this lamp combines artistic design with functional lighting. The warm glow emanates through the carefully designed openings, creating an ambient atmosphere perfect for any living space.

The lamp comes with an LED bulb and touch-dimmer base, allowing you to adjust the brightness to suit your mood.`,
    shortDescription: 'A mesmerizing spiral design that creates beautiful light patterns.',
    price: 299.00,
    compareAtPrice: 350.00,
    images: [
      {
        id: 'img-1-1',
        url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop',
        filename: 'spiral-lamp-1.jpg',
      },
      {
        id: 'img-1-2',
        url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=800&fit=crop',
        filename: 'spiral-lamp-2.jpg',
      },
    ],
    categoryId: 'cat-1',
    categoryName: 'Table Lamps',
    inStock: true,
    stockQuantity: 15,
    specifications: `Dimensions: 25cm (H) x 15cm (W)
Material: Premium PLA
Weight: 450g
Bulb: LED E14 (included)
Base: Touch-dimmer with USB-C power
Color: Pearl White`,
    featured: true,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'prod-2',
    name: 'Geometric Bloom Lamp',
    slug: 'geometric-bloom-lamp',
    description: `The Geometric Bloom Lamp combines organic flower-like forms with precise geometric patterns. When lit, the lamp transforms into a blooming flower of light, casting intricate shadows on surrounding surfaces.

Each petal is carefully designed to diffuse light evenly while creating a dramatic visual effect. The modular design allows for easy bulb replacement and cleaning.

Perfect as a centerpiece or bedside companion.`,
    shortDescription: 'Organic flower forms meet geometric precision in this stunning lamp.',
    price: 275.00,
    images: [
      {
        id: 'img-2-1',
        url: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&h=800&fit=crop',
        filename: 'bloom-lamp-1.jpg',
      },
    ],
    categoryId: 'cat-1',
    categoryName: 'Table Lamps',
    inStock: true,
    stockQuantity: 8,
    specifications: `Dimensions: 30cm (H) x 20cm (W)
Material: Premium PETG
Weight: 520g
Bulb: LED E14 (included)
Base: Wooden oak base
Color: Midnight Black`,
    featured: true,
    createdAt: '2024-01-14T10:00:00Z',
  },
  {
    id: 'prod-3',
    name: 'Klein Blue Sculpture Lamp',
    slug: 'klein-blue-sculpture-lamp',
    description: `Inspired by the iconic International Klein Blue, this sculptural lamp is a statement piece that doubles as art. The flowing, organic form captures light in unexpected ways.

The vibrant blue color is achieved through a special pigment-infused filament that maintains its intensity over time. Each lamp is a unique piece of functional art.`,
    shortDescription: 'A bold sculptural lamp in iconic Klein Blue.',
    price: 325.00,
    images: [
      {
        id: 'img-3-1',
        url: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&h=800&fit=crop',
        filename: 'klein-lamp-1.jpg',
      },
    ],
    categoryId: 'cat-1',
    categoryName: 'Table Lamps',
    inStock: false,
    stockQuantity: 0,
    specifications: `Dimensions: 28cm (H) x 18cm (W)
Material: Pigment-infused PLA
Weight: 480g
Bulb: LED E14 (included)
Base: Matte black steel
Color: Klein Blue`,
    featured: true,
    createdAt: '2024-01-13T10:00:00Z',
  },
  {
    id: 'prod-4',
    name: 'Twisted Helix Vase',
    slug: 'twisted-helix-vase',
    description: `The Twisted Helix Vase features a mesmerizing double helix pattern that spirals from base to top. The mathematical precision of the design creates a sense of movement and flow.

Waterproof inner liner included, making it suitable for fresh flowers. Also stunning as a standalone decorative piece.`,
    shortDescription: 'A mathematically precise double helix design.',
    price: 145.00,
    images: [
      {
        id: 'img-4-1',
        url: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&h=800&fit=crop',
        filename: 'helix-vase-1.jpg',
      },
    ],
    categoryId: 'cat-2',
    categoryName: 'Vases',
    inStock: true,
    stockQuantity: 25,
    specifications: `Dimensions: 25cm (H) x 12cm (W)
Material: Premium PLA
Weight: 280g
Includes: Waterproof glass liner
Color: Matte White`,
    featured: false,
    createdAt: '2024-01-12T10:00:00Z',
  },
  {
    id: 'prod-5',
    name: 'Honeycomb Pen Holder',
    slug: 'honeycomb-pen-holder',
    description: `Organize your desk in style with this honeycomb-inspired pen holder. The hexagonal structure provides multiple compartments of varying sizes for pens, pencils, scissors, and more.

The organic design brings a touch of nature to your workspace while keeping everything within reach.`,
    shortDescription: 'Nature-inspired desk organization.',
    price: 65.00,
    images: [
      {
        id: 'img-5-1',
        url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&h=800&fit=crop',
        filename: 'honeycomb-holder-1.jpg',
      },
    ],
    categoryId: 'cat-3',
    categoryName: 'Desk Accessories',
    inStock: true,
    stockQuantity: 50,
    specifications: `Dimensions: 12cm (H) x 10cm (W) x 10cm (D)
Material: Premium PLA
Weight: 180g
Compartments: 7 hexagonal cells
Color: Natural Wood Tone`,
    featured: false,
    createdAt: '2024-01-11T10:00:00Z',
  },
  {
    id: 'prod-6',
    name: 'Minimalist Card Stand',
    slug: 'minimalist-card-stand',
    description: `A sleek, minimalist business card holder that makes a statement on any desk. The elegant curve holds cards at the perfect angle for easy access.

Available in multiple colors to match your workspace aesthetic.`,
    shortDescription: 'Elegant simplicity for your business cards.',
    price: 35.00,
    images: [
      {
        id: 'img-6-1',
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop',
        filename: 'card-stand-1.jpg',
      },
    ],
    categoryId: 'cat-3',
    categoryName: 'Desk Accessories',
    inStock: true,
    stockQuantity: 100,
    specifications: `Dimensions: 5cm (H) x 10cm (W) x 4cm (D)
Material: Premium PLA
Weight: 45g
Capacity: ~30 standard business cards
Color: Charcoal Gray`,
    featured: false,
    createdAt: '2024-01-10T10:00:00Z',
  },
];
