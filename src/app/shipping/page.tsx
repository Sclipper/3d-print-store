import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Доставка и връщане | Bemu',
  description: 'Информация за доставка, срокове и политика за връщане на продукти.',
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Доставка и връщане
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Всичко, което трябва да знаете за доставката и връщането на продукти
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Delivery Info */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Доставка</h2>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Цени на доставка</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">До офис на куриер</span>
                    <span className="font-medium">4.99 лв.</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">До адрес</span>
                    <span className="font-medium">6.99 лв.</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">При поръчка над 50 лв.</span>
                    <span className="font-medium text-green-600">Безплатна</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Срокове за доставка</h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong className="text-gray-900">Време за изработка:</strong> 1-3 работни дни в зависимост от 
                    сложността на продукта. При персонализирани поръчки времето може да бъде по-дълго.
                  </p>
                  <p>
                    <strong className="text-gray-900">Време за доставка:</strong> 1-2 работни дни след изпращане на 
                    пратката. Доставките се извършват от понеделник до петък.
                  </p>
                  <p>
                    <strong className="text-gray-900">Общо време:</strong> Очаквайте да получите поръчката си в 
                    рамките на 3-5 работни дни от момента на поръчката.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Куриерски партньори</h3>
                <p className="text-gray-600 mb-4">
                  Работим с утвърдени куриерски компании, за да гарантираме бързата и безопасна 
                  доставка на вашите поръчки:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Еконт</li>
                  <li>Спиди</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Проследяване на поръчка</h3>
                <p className="text-gray-600">
                  След изпращане на вашата поръчка ще получите имейл с номер за проследяване. 
                  С този номер можете да следите статуса на доставката в реално време на сайта 
                  на куриерската компания.
                </p>
              </div>
            </div>
          </div>

          {/* Returns Info */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Връщане на продукти</h2>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Политика за връщане</h3>
                <p className="text-gray-600 mb-4">
                  Вашето удовлетворение е наш приоритет. Ако по някаква причина не сте доволни 
                  от покупката си, имате право да я върнете при следните условия:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Срок за връщане: 14 дни от получаването на поръчката</li>
                  <li>Продуктът трябва да е в оригинално състояние и опаковка</li>
                  <li>Продуктът не трябва да е бил използван</li>
                  <li>Персонализираните продукти не подлежат на връщане (освен при дефект)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Процедура за връщане</h3>
                <ol className="list-decimal list-inside text-gray-600 space-y-3">
                  <li>
                    Свържете се с нас на <a href="mailto:contact@bemu.bg" className="text-black underline">contact@bemu.bg</a> или 
                    чрез <a href="/contact" className="text-black underline">формата за контакт</a> с номера на 
                    поръчката и причината за връщане.
                  </li>
                  <li>
                    Ще получите инструкции за връщане и етикет за куриер (ако е приложимо).
                  </li>
                  <li>
                    Опаковайте продукта внимателно в оригиналната опаковка.
                  </li>
                  <li>
                    Изпратете пратката чрез посочения куриер.
                  </li>
                  <li>
                    След получаване и проверка на продукта, ще обработим възстановяването в 
                    рамките на 5 работни дни.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Възстановяване на сума</h3>
                <p className="text-gray-600">
                  Сумата ще бъде възстановена по същия метод на плащане, който сте използвали 
                  при поръчката. При плащане с карта, възстановяването може да отнеме допълнително 
                  5-10 работни дни в зависимост от вашата банка.
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Дефектни продукти</h3>
                <p className="text-gray-600">
                  Ако сте получили дефектен продукт, моля свържете се с нас в рамките на 48 часа 
                  от получаването със снимки на дефекта. Ще организираме безплатна замяна или 
                  пълно възстановяване на сумата по ваш избор.
                </p>
              </div>
            </div>
          </div>

          {/* Warranty */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Гаранция</h2>
            </div>

            <div className="space-y-4 text-gray-600">
              <p>
                Предлагаме 30-дневна гаранция за производствени дефекти на всички наши продукти. 
                Гаранцията покрива:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Дефекти в материала</li>
                <li>Проблеми с качеството на принтиране</li>
                <li>Структурни слабости, които не са резултат от неправилна употреба</li>
              </ul>
              <p className="mt-4">
                <strong className="text-gray-900">Гаранцията не покрива:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Повреди от неправилна употреба или съхранение</li>
                <li>Механични повреди (удари, падания)</li>
                <li>Износване при нормална употреба</li>
                <li>Повреди от излагане на екстремни температури</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Имате въпроси?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Нашият екип е тук, за да ви помогне с всякакви въпроси относно доставката или връщането.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
          >
            Свържете се с нас
          </a>
        </div>
      </section>
    </div>
  );
}
