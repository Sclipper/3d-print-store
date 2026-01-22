import Link from 'next/link';

export const metadata = {
  title: 'Order Confirmed | 3D Print Store',
  description: 'Thank you for your purchase!',
};

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-light mb-4">Thank you for your order!</h1>
        
        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully. We&apos;ll send you an email
          confirmation with your order details shortly.
        </p>

        {session_id && (
          <p className="text-sm text-gray-500 mb-6">
            Order reference: <span className="font-mono">{session_id.slice(0, 20)}...</span>
          </p>
        )}

        <div className="space-y-3">
          <Link
            href="/products"
            className="block w-full py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="block w-full py-3 border border-gray-200 text-sm font-medium hover:border-black transition-colors"
          >
            Return to Home
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <h2 className="text-sm font-medium mb-4">What happens next?</h2>
          <ul className="text-sm text-gray-600 space-y-2 text-left">
            <li className="flex items-start gap-2">
              <span className="text-gray-400">1.</span>
              You&apos;ll receive an order confirmation email
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">2.</span>
              We&apos;ll prepare your item for shipping
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">3.</span>
              You&apos;ll receive tracking information once shipped
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
