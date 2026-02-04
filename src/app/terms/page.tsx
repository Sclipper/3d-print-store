import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Общи условия | Bemu',
  description: 'Общи условия за ползване на онлайн магазин Bemu.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Общи условия
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Условия за ползване на онлайн магазин Bemu
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-500 mb-8">
              Последна актуализация: 1 февруари 2026 г.
            </p>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Общи положения</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Настоящите Общи условия уреждат взаимоотношенията между „Bemu" (наричан 
                    по-долу „Продавач") и потребителите на онлайн магазина bemu.bg (наричани 
                    по-долу „Купувачи" или „Потребители").
                  </p>
                  <p>
                    С използването на този уебсайт и/или с поръчка на продукти, Вие се съгласявате 
                    да бъдете обвързани с настоящите Общи условия. Ако не сте съгласни с тези 
                    условия, моля не използвайте сайта.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Дефиниции</h2>
                <div className="space-y-4 text-gray-600">
                  <p><strong>„Продукт"</strong> – всяка стока, предлагана за продажба в онлайн магазина.</p>
                  <p><strong>„Поръчка"</strong> – електронен документ, представляващ заявка за покупка на Продукт.</p>
                  <p><strong>„Договор за покупко-продажба"</strong> – договор, сключен от разстояние между Продавача и Купувача.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Процедура за поръчка</h2>
                <div className="space-y-4 text-gray-600">
                  <p>3.1. Поръчките се извършват онлайн чрез уебсайта bemu.bg.</p>
                  <p>3.2. За да направите поръчка:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Изберете желания продукт и го добавете в кошницата</li>
                    <li>Попълнете данните за доставка</li>
                    <li>Изберете метод на плащане</li>
                    <li>Потвърдете поръчката</li>
                  </ul>
                  <p>3.3. След потвърждаване на поръчката ще получите имейл с детайлите на поръчката.</p>
                  <p>3.4. Договорът за покупко-продажба се счита за сключен от момента на потвърждение на поръчката от страна на Продавача.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Цени и плащане</h2>
                <div className="space-y-4 text-gray-600">
                  <p>4.1. Всички цени са в български лева (BGN) и включват ДДС.</p>
                  <p>4.2. Цената на доставката се добавя към стойността на поръчката и се показва преди потвърждаване.</p>
                  <p>4.3. Приемаме следните методи на плащане:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Дебитна/кредитна карта (Visa, Mastercard)</li>
                    <li>Наложен платеж</li>
                  </ul>
                  <p>4.4. Онлайн плащанията се обработват сигурно чрез Stripe.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Доставка</h2>
                <div className="space-y-4 text-gray-600">
                  <p>5.1. Доставката се извършва на територията на Република България.</p>
                  <p>5.2. Срокове за доставка:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Време за изработка: 1-3 работни дни</li>
                    <li>Време за доставка: 1-2 работни дни след изпращане</li>
                  </ul>
                  <p>5.3. Посочените срокове са ориентировъчни и могат да варират в зависимост от обстоятелствата.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Право на отказ</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    6.1. Съгласно Закона за защита на потребителите, имате право да се откажете от 
                    договора в срок от 14 дни от получаването на стоката, без да посочвате причина.
                  </p>
                  <p>
                    6.2. За да упражните правото си на отказ, трябва да ни уведомите за решението 
                    си с недвусмислено заявление (например по имейл).
                  </p>
                  <p>6.3. Правото на отказ не се прилага за:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Персонализирани продукти, изработени по индивидуална поръчка</li>
                    <li>Продукти, които поради своето естество не могат да бъдат върнати</li>
                  </ul>
                  <p>
                    6.4. При упражняване на правото на отказ, продуктът трябва да бъде върнат в 
                    оригинално състояние и опаковка.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Гаранция и рекламации</h2>
                <div className="space-y-4 text-gray-600">
                  <p>7.1. Предлагаме 30-дневна гаранция за производствени дефекти.</p>
                  <p>7.2. При получаване на дефектен продукт:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Свържете се с нас в рамките на 48 часа</li>
                    <li>Предоставете снимки на дефекта</li>
                    <li>Ще организираме замяна или възстановяване на сумата</li>
                  </ul>
                  <p>7.3. Гаранцията не покрива повреди от неправилна употреба или механични щети.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Интелектуална собственост</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    8.1. Всички дизайни, изображения и съдържание на сайта са защитени с авторски 
                    права и са собственост на Bemu.
                  </p>
                  <p>
                    8.2. Забранено е копирането, разпространението или възпроизвеждането на 
                    материали от сайта без изрично писмено разрешение.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Лични данни</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    9.1. Обработването на лични данни се извършва съгласно нашата{' '}
                    <a href="/privacy" className="text-black underline">Политика за поверителност</a>.
                  </p>
                  <p>
                    9.2. Събираме и обработваме лични данни единствено за целите на изпълнение 
                    на поръчките и подобряване на услугите.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Ограничение на отговорността</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    10.1. Продавачът не носи отговорност за вреди, причинени от неправилна 
                    употреба на продуктите.
                  </p>
                  <p>
                    10.2. Продавачът не носи отговорност за забавяне на доставката, причинено 
                    от куриерската компания или форсмажорни обстоятелства.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Изменения</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Запазваме си правото да изменяме настоящите Общи условия по всяко време. 
                    Промените влизат в сила от момента на публикуването им на сайта.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Приложимо право</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Настоящите Общи условия се уреждат от законодателството на Република България. 
                    Всички спорове се решават по взаимно съгласие, а при невъзможност – от 
                    компетентния български съд.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Контакт</h2>
                <div className="space-y-4 text-gray-600">
                  <p>За въпроси относно настоящите Общи условия, свържете се с нас:</p>
                  <p>Имейл: <a href="mailto:contact@bemu.bg" className="text-black underline">contact@bemu.bg</a></p>
                  <p>Форма за контакт: <a href="/contact" className="text-black underline">bemu.bg/contact</a></p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
