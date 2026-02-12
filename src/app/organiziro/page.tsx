import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getOrganiziroProducts } from '@/lib/airtable';
import DrawerCalculator from '@/components/organiziro/DrawerCalculator';
import Newsletter from '@/components/layout/Newsletter';
import { OrganiziroProduct } from '@/lib/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bemu.bg';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Система Организиро | Gridfinity организация',
  description: 'Организирайте вашите чекмеджета с модулната система Организиро, базирана на Gridfinity. Калкулатор за размери, основи и кутии за перфектна организация.',
  alternates: {
    canonical: `${BASE_URL}/organiziro`,
  },
  openGraph: {
    title: 'Система Организиро | Gridfinity организация | Bemu',
    description: 'Организирайте вашите чекмеджета с модулната система Организиро, базирана на Gridfinity. Калкулатор за размери, основи и кутии за перфектна организация.',
    url: `${BASE_URL}/organiziro`,
  },
};

export default async function OrganiziroPage() {
  let products: OrganiziroProduct[] = [];

  try {
    products = await getOrganiziroProducts();
  } catch (error) {
    console.error('Failed to fetch Organiziro products:', error);
  }

  const gridBases = products.filter((p) => p.category === 'grid');
  const boxes = products.filter((p) => p.category === 'box');

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-black transition-colors">
              Начало
            </Link>
            <span className="mx-2">/</span>
            <span className="text-black">Система Организиро</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-light mb-4">Система Организиро</h1>
            <p className="text-lg text-gray-600 mb-6">
              Модулна система за организация на чекмеджета, базирана на популярната Gridfinity система. 
              Свържете основите лесно с SnapClips и създайте перфектната организация за вашите инструменти и аксесоари.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="bg-white px-4 py-2 border border-gray-200">
                <span className="text-gray-500">Размер на единица:</span>{' '}
                <span className="font-medium">42 x 42 мм</span>
              </div>
              <div className="bg-white px-4 py-2 border border-gray-200">
                <span className="text-gray-500">Макс. конфигурация:</span>{' '}
                <span className="font-medium">5 x 5 единици</span>
              </div>
              <div className="bg-white px-4 py-2 border border-gray-200">
                <span className="text-gray-500">Височина:</span>{' '}
                <span className="font-medium">6 мм</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DrawerCalculator gridBases={gridBases} />
        </div>
      </section>

      {/* Grid Bases Section */}
      {gridBases.length > 0 && (
        <section className="py-12 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-light">Грид основи</h2>
              <span className="text-sm text-gray-500">
                {gridBases.length} {gridBases.length === 1 ? 'продукт' : 'продукти'}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {gridBases.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group"
                >
                  <div className="aspect-square bg-gray-100 mb-3 overflow-hidden relative">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Няма снимка
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-medium group-hover:underline">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.price.toFixed(2)} лв.</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Boxes Section */}
      {boxes.length > 0 && (
        <section className="py-12 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-light">Кутии за организация</h2>
              <span className="text-sm text-gray-500">
                {boxes.length} {boxes.length === 1 ? 'продукт' : 'продукти'}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {boxes.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group"
                >
                  <div className="aspect-square bg-gray-100 mb-3 overflow-hidden relative">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Няма снимка
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-medium group-hover:underline">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.price.toFixed(2)} лв.</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-light mb-4">Как работи системата?</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong className="text-black">1. Изберете основи:</strong> Използвайте калкулатора по-горе, за да определите колко основи ви трябват за вашето чекмедже.
              </p>
              <p>
                <strong className="text-black">2. Свържете основите:</strong> Използвайте U-образните SnapClips, за да свържете основите здраво. Просто ги натиснете в отворите по краищата.
              </p>
              <p>
                <strong className="text-black">3. Добавете кутии:</strong> Изберете от разнообразието от кутии за организация, които пасват перфектно в грид системата.
              </p>
              <p>
                <strong className="text-black">4. Преконфигурирайте:</strong> Системата е напълно модулна - можете да разделяте и преподреждате елементите по всяко време.
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Забележка: Оригиналната Gridfinity система е разработена от Zack Freedman.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </>
  );
}
