import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex-1 flex items-center justify-center py-20">
      <div className="text-center px-4">
        <h1 className="text-6xl font-light text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-light text-gray-600 mb-6">Page Not Found</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or
          doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="inline-block px-8 py-3 border border-black text-black text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </section>
  );
}
