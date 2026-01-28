import { NextRequest, NextResponse } from 'next/server';
import { constructWebhookEvent, getCheckoutSession } from '@/lib/stripe';
import { createOrderWithItems } from '@/lib/airtable';
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

      // Parse all items from metadata (including price for historical record)
      const items: { productRecordId: string; quantity: number; priceEach: number }[] = [];
      for (let i = 0; i < itemCount; i++) {
        const productId = session.metadata?.[`product_${i}_id`];
        const quantity = parseInt(session.metadata?.[`product_${i}_quantity`] || '1', 10);
        const priceEach = parseFloat(session.metadata?.[`product_${i}_price`] || '0');
        if (productId) {
          items.push({ productRecordId: productId, quantity, priceEach });
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

      // Create order with all line items in Airtable (idempotent - won't create duplicates)
      try {
        console.log('Creating Airtable order with items...');
        const { order, orderItems, alreadyExisted } = await createOrderWithItems({
          orderId: session.id,
          customerEmail: session.customer_details?.email || '',
          customerName: session.customer_details?.name || '',
          totalAmount: (session.amount_total || 0) / 100, // Convert from cents
          shippingAddress,
          items,
        });

        if (alreadyExisted) {
          console.log('Order already existed for session:', session.id, '- skipped duplicate creation');
        } else {
          console.log('Order created successfully:', order.id);
          console.log('Order items created:', orderItems.length);
          orderItems.forEach((item, index) => {
            console.log(`  Item ${index + 1}: Product ${item.productId}, Qty: ${item.quantity}, Price: $${item.priceEach}`);
          });
        }
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
