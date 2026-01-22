# 3D Print Store

A modern e-commerce store built with Next.js, Airtable, and Stripe.

## Features

- Product catalog with categories
- Product detail pages with image galleries
- Stripe checkout integration
- Order tracking via Airtable
- Responsive, minimalist design

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Airtable
- **Payments**: Stripe

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn
- Airtable account
- Stripe account

### Installation

1. Clone the repository:

```bash
git clone git@github.com:Sclipper/3d-print-store.git
cd 3d-print-store
```

2. Install dependencies:

```bash
yarn install
```

3. Copy the environment file and fill in your values:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the store.

## Airtable Setup

Create a new Airtable base with the following tables:

### Products Table

| Field Name | Type |
|------------|------|
| Name | Single line text |
| Slug | Single line text |
| Description | Long text |
| Short Description | Long text |
| Price | Currency |
| Compare At Price | Currency |
| Images | Attachment |
| Category | Link to Categories |
| In Stock | Checkbox |
| Stock Quantity | Number |
| Specifications | Long text |
| Featured | Checkbox |
| Created | Created time |

### Categories Table

| Field Name | Type |
|------------|------|
| Name | Single line text |
| Slug | Single line text |
| Description | Long text |
| Image | Attachment |
| Order | Number |

### Orders Table

| Field Name | Type |
|------------|------|
| Order ID | Single line text |
| Customer Email | Email |
| Customer Name | Single line text |
| Product | Link to Products |
| Quantity | Number |
| Total Amount | Currency |
| Status | Single select (pending, paid, shipped, delivered) |
| Shipping Address | Long text |
| Created | Created time |

## Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Dashboard
3. Create a webhook endpoint pointing to `/api/webhook/stripe`
4. Subscribe to the `checkout.session.completed` event

### Local Development with Stripe

Use the Stripe CLI to forward webhooks locally:

```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `AIRTABLE_API_KEY` | Your Airtable API key |
| `AIRTABLE_BASE_ID` | Your Airtable base ID |
| `STRIPE_SECRET_KEY` | Stripe secret key (sk_test_...) |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (pk_test_...) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NEXT_PUBLIC_BASE_URL` | Your site URL |

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── categories/        # Category pages
│   ├── checkout/          # Checkout success page
│   └── products/          # Product pages
├── components/            # React components
│   ├── layout/           # Header, Footer, Newsletter
│   └── product/          # Product-related components
└── lib/                   # Utilities
    ├── airtable.ts       # Airtable client
    ├── stripe.ts         # Stripe client
    └── types.ts          # TypeScript types
```

## License

MIT
