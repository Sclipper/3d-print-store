import Stripe from 'stripe';

// Initialize Stripe server-side client
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

interface CheckoutItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

// Create a checkout session
export async function createCheckoutSession(params: {
  items: CheckoutItem[];
  successUrl: string;
  cancelUrl: string;
}): Promise<Stripe.Checkout.Session> {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = params.items.map((item) => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: item.productName,
        images: item.imageUrl ? [item.imageUrl] : [],
      },
      unit_amount: Math.round(item.price * 100), // Convert to cents
    },
    quantity: item.quantity,
  }));

  // Create metadata with all product IDs, quantities, and prices
  const metadata: Record<string, string> = {
    itemCount: params.items.length.toString(),
  };
  
  params.items.forEach((item, index) => {
    metadata[`product_${index}_id`] = item.productId;
    metadata[`product_${index}_quantity`] = item.quantity.toString();
    metadata[`product_${index}_price`] = item.price.toString(); // Store unit price for historical record
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    shipping_address_collection: {
      allowed_countries: ['BG'], // Bulgaria only
    },
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true, // Require phone number
    },
    tax_id_collection: {
      enabled: true, // Allow customers to enter VAT numbers
    },
    allow_promotion_codes: true, // Allow coupon/promotion codes
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 250, // 2.50 EUR in cents
            currency: 'eur',
          },
          display_name: 'Доставка с Еконт',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 2,
            },
            maximum: {
              unit: 'business_day',
              value: 5,
            },
          },
        },
      },
    ],
    custom_text: {
      shipping_address: {
        message: 'Доставката се извършва с Еконт. Ако желаете доставка до офис на Еконт, моля въведете адреса на офиса вместо вашия домашен адрес.',
      },
      submit: {
        message: 'Ще получите потвърждение на имейла си с детайли за доставката.',
      },
    },
    metadata,
  });

  return session;
}

// Verify webhook signature
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    throw new Error('Stripe webhook secret is not configured');
  }

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

// Get checkout session with expanded data
export async function getCheckoutSession(
  sessionId: string
): Promise<Stripe.Checkout.Session> {
  return await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['customer', 'line_items'],
  });
}
