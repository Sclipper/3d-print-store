import Link from 'next/link';

export const metadata = {
  title: 'Поръчката е потвърдена | 3D Принт Магазин',
  description: 'Благодарим ви за покупката!',
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

        <h1 className="text-2xl font-light mb-4">Благодарим ви за поръчката!</h1>
        
        <p className="text-gray-600 mb-6">
          Плащането ви е обработено успешно. Ще ви изпратим имейл
          потвърждение с детайлите на поръчката скоро.
        </p>

        {session_id && (
          <p className="text-sm text-gray-500 mb-6">
            Референция на поръчката: <span className="font-mono">{session_id.slice(0, 20)}...</span>
          </p>
        )}

        <div className="space-y-3">
          <Link
            href="/products"
            className="block w-full py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Продължете пазаруването
          </Link>
          <Link
            href="/"
            className="block w-full py-3 border border-gray-200 text-sm font-medium hover:border-black transition-colors"
          >
            Към началната страница
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <h2 className="text-sm font-medium mb-4">Какво следва?</h2>
          <ul className="text-sm text-gray-600 space-y-2 text-left">
            <li className="flex items-start gap-2">
              <span className="text-gray-400">1.</span>
              Ще получите имейл потвърждение на поръчката
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">2.</span>
              Ще подготвим артикула ви за доставка
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">3.</span>
              Ще получите информация за проследяване след изпращане
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
