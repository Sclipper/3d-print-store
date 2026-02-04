import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика за поверителност | Bemu',
  description: 'Политика за поверителност и защита на личните данни на Bemu.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Политика за поверителност
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Как събираме, използваме и защитаваме вашите лични данни
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Въведение</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Bemu („ние", „нас" или „нашият") се ангажира да защитава поверителността 
                    на вашите лични данни. Настоящата Политика за поверителност описва как 
                    събираме, използваме и защитаваме вашата информация, когато използвате 
                    нашия уебсайт bemu.bg.
                  </p>
                  <p>
                    Обработването на лични данни се извършва в съответствие с Регламент (ЕС) 
                    2016/679 (GDPR) и Закона за защита на личните данни.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Какви данни събираме</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Събираме следните видове лични данни:</p>
                  
                  <h3 className="font-semibold text-gray-900 mt-6">2.1. Данни, които предоставяте директно:</h3>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Име и фамилия</li>
                    <li>Имейл адрес</li>
                    <li>Телефонен номер</li>
                    <li>Адрес за доставка</li>
                    <li>Данни за плащане (обработват се сигурно от Stripe)</li>
                  </ul>

                  <h3 className="font-semibold text-gray-900 mt-6">2.2. Данни, събирани автоматично:</h3>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>IP адрес</li>
                    <li>Тип браузър и устройство</li>
                    <li>Страници, които посещавате</li>
                    <li>Време, прекарано на сайта</li>
                    <li>Бисквитки и подобни технологии</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Как използваме вашите данни</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Използваме вашите лични данни за следните цели:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li><strong>Обработка на поръчки:</strong> За да обработим и доставим вашите поръчки</li>
                    <li><strong>Комуникация:</strong> За да отговорим на вашите въпроси и да ви информираме за статуса на поръчката</li>
                    <li><strong>Подобряване на услугите:</strong> За да анализираме използването на сайта и да подобрим потребителското изживяване</li>
                    <li><strong>Маркетинг:</strong> За да ви изпращаме новини и промоции (само с ваше съгласие)</li>
                    <li><strong>Правни задължения:</strong> За да спазваме законовите изисквания</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Правно основание за обработка</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Обработваме вашите данни на следните правни основания:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li><strong>Изпълнение на договор:</strong> За да изпълним поръчка или да предоставим услуга, която сте заявили</li>
                    <li><strong>Легитимен интерес:</strong> За подобряване на нашите услуги и сигурност на сайта</li>
                    <li><strong>Съгласие:</strong> За маркетингови комуникации</li>
                    <li><strong>Законово задължение:</strong> За спазване на данъчни и счетоводни изисквания</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Споделяне на данни</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Споделяме вашите данни само с:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li><strong>Куриерски компании:</strong> За доставка на поръчки (Еконт, Спиди)</li>
                    <li><strong>Платежни доставчици:</strong> Stripe за обработка на онлайн плащания</li>
                    <li><strong>Аналитични услуги:</strong> Google Analytics за анализ на трафика</li>
                  </ul>
                  <p className="mt-4">
                    Не продаваме вашите лични данни на трети страни.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Бисквитки</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Използваме бисквитки за:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li><strong>Необходими бисквитки:</strong> За функционирането на сайта и кошницата</li>
                    <li><strong>Аналитични бисквитки:</strong> За анализ на посещенията</li>
                    <li><strong>Маркетингови бисквитки:</strong> За персонализирана реклама (с ваше съгласие)</li>
                  </ul>
                  <p className="mt-4">
                    Можете да управлявате предпочитанията си за бисквитки чрез настройките 
                    на браузъра си.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Съхранение на данни</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Съхраняваме вашите данни за следните периоди:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li><strong>Данни за поръчки:</strong> 5 години (законово изискване)</li>
                    <li><strong>Комуникация:</strong> 2 години</li>
                    <li><strong>Маркетинг:</strong> До отказ от абонамент</li>
                    <li><strong>Аналитични данни:</strong> 26 месеца</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Вашите права</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Съгласно GDPR имате следните права:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li><strong>Право на достъп:</strong> Да получите копие на вашите данни</li>
                    <li><strong>Право на коригиране:</strong> Да поправите неточни данни</li>
                    <li><strong>Право на изтриване:</strong> Да поискате изтриване на данните си</li>
                    <li><strong>Право на ограничаване:</strong> Да ограничите обработката</li>
                    <li><strong>Право на преносимост:</strong> Да получите данните си в машинно четим формат</li>
                    <li><strong>Право на възражение:</strong> Да възразите срещу обработката</li>
                    <li><strong>Право на оттегляне на съгласие:</strong> Да оттеглите съгласието си по всяко време</li>
                  </ul>
                  <p className="mt-4">
                    За да упражните правата си, свържете се с нас на{' '}
                    <a href="mailto:contact@bemu.bg" className="text-black underline">contact@bemu.bg</a>.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Сигурност на данните</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Прилагаме подходящи технически и организационни мерки за защита на вашите 
                    данни, включително:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>SSL криптиране на всички данни</li>
                    <li>Сигурно обработване на плащания чрез Stripe (PCI DSS съвместим)</li>
                    <li>Ограничен достъп до лични данни</li>
                    <li>Редовни проверки на сигурността</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Данни на деца</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Нашият сайт не е предназначен за лица под 16 години. Не събираме съзнателно 
                    лични данни от деца. Ако установим, че сме събрали такива данни, ще ги 
                    изтрием незабавно.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Промени в политиката</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Можем да актуализираме тази Политика за поверителност периодично. Ще ви 
                    уведомим за съществени промени чрез имейл или известие на сайта. Датата 
                    на последната актуализация е посочена в началото на документа.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Контакт и жалби</h2>
                <div className="space-y-4 text-gray-600">
                  <p>За въпроси относно поверителността на данните, свържете се с нас:</p>
                  <p>Имейл: <a href="mailto:contact@bemu.bg" className="text-black underline">contact@bemu.bg</a></p>
                  <p className="mt-4">
                    Ако смятате, че правата ви са нарушени, имате право да подадете жалба до 
                    Комисията за защита на личните данни (КЗЛД):
                  </p>
                  <p>Уебсайт: <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer" className="text-black underline">www.cpdp.bg</a></p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
