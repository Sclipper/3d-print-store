import { NextRequest, NextResponse } from 'next/server';
import { constructWebhookEvent, getCheckoutSession } from '@/lib/stripe';
import { createOrder } from '@/lib/airtable';
import { ShippingAddress } from '@/lib/types';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing Stripe signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = constructWebhookEvent(body, signature);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log('Processing checkout.session.completed:', session.id);
      console.log('Session metadata:', session.metadata);

      // Get full session details
      const fullSession = await getCheckoutSession(session.id);

      // Extract order details from metadata
      const itemCount = parseInt(session.metadata?.itemCount || '0', 10);

      if (itemCount === 0) {
        console.log('No items in metadata, skipping Airtable order creation (this may be a test webhook)');
        // Return success anyway - this handles test webhooks from Stripe CLI
        return NextResponse.json({ received: true });
      }

      // Parse all items from metadata
      const items: { productId: string; quantity: number }[] = [];
      for (let i = 0; i < itemCount; i++) {
        const productId = session.metadata?.[`product_${i}_id`];
        const quantity = parseInt(session.metadata?.[`product_${i}_quantity`] || '1', 10);
        if (productId) {
          items.push({ productId, quantity });
        }
      }

      console.log('Parsed items:', items);

      // Build shipping address - cast session to access shipping details
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sessionData = fullSession as any;
      const shippingInfo = sessionData.collected_information?.shipping_details || 
                          sessionData.shipping_details || 
                          sessionData.shipping;
      
      // Get phone number from customer details
      const phoneNumber = session.customer_details?.phone || '';
      
      const shippingAddress: ShippingAddress = {
        name: shippingInfo?.name || session.customer_details?.name || '',
        phone: phoneNumber,
        line1: shippingInfo?.address?.line1 || '',
        line2: shippingInfo?.address?.line2 || undefined,
        city: shippingInfo?.address?.city || '',
        state: shippingInfo?.address?.state || '',
        postalCode: shippingInfo?.address?.postal_code || '',
        country: shippingInfo?.address?.country || '',
      };

      console.log('Shipping address:', shippingAddress);
      console.log('Customer:', session.customer_details?.name, session.customer_details?.email);

      // Create order in Airtable for each item
      try {
        for (const item of items) {
          console.log('Creating Airtable order for product:', item.productId);
          await createOrder({
            orderId: session.id,
            customerEmail: session.customer_details?.email || '',
            customerName: session.customer_details?.name || '',
            productId: item.productId,
            quantity: item.quantity,
            totalAmount: (session.amount_total || 0) / 100, // Convert from cents
            shippingAddress,
          });
          console.log('Order created for product:', item.productId);
        }

        console.log('All orders created successfully:', session.id, `(${items.length} items)`);
      } catch (err) {
        console.error('Failed to create order in Airtable:', err);
        // Don't fail the webhook - Stripe will retry
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
