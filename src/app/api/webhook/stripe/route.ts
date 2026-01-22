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

      // Get full session details
      const fullSession = await getCheckoutSession(session.id);

      // Extract order details
      const productId = session.metadata?.productId;
      const quantity = parseInt(session.metadata?.quantity || '1', 10);

      if (!productId) {
        console.error('Missing product ID in session metadata');
        return NextResponse.json(
          { error: 'Missing product ID' },
          { status: 400 }
        );
      }

      // Build shipping address - cast session to access shipping details
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sessionData = fullSession as any;
      const shippingInfo = sessionData.collected_information?.shipping_details || 
                          sessionData.shipping_details || 
                          sessionData.shipping;
      const shippingAddress: ShippingAddress = {
        name: shippingInfo?.name || session.customer_details?.name || '',
        line1: shippingInfo?.address?.line1 || '',
        line2: shippingInfo?.address?.line2 || undefined,
        city: shippingInfo?.address?.city || '',
        state: shippingInfo?.address?.state || '',
        postalCode: shippingInfo?.address?.postal_code || '',
        country: shippingInfo?.address?.country || '',
      };

      // Create order in Airtable
      try {
        await createOrder({
          orderId: session.id,
          customerEmail: session.customer_details?.email || '',
          customerName: session.customer_details?.name || '',
          productId,
          quantity,
          totalAmount: (session.amount_total || 0) / 100, // Convert from cents
          shippingAddress,
        });

        console.log('Order created successfully:', session.id);
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
