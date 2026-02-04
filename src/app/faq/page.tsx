'use client';

import { useState } from 'react';
import { Metadata } from 'next';

const faqs = [
  {
    category: 'Поръчки',
    questions: [
      {
        question: 'Как мога да направя поръчка?',
        answer: 'Добавете желаните продукти в кошницата и преминете към плащане. Попълнете данните за доставка и изберете метод на плащане. След потвърждаване на поръчката ще получите имейл с детайлите.',
      },
      {
        question: 'Мога ли да променя или отменя поръчката си?',
        answer: 'Да, можете да промените или отмените поръчката си в рамките на 2 часа от нейното създаване. След това производственият процес започва и промени не са възможни. Свържете се с нас възможно най-скоро, ако имате нужда от промяна.',
      },
      {
        question: 'Какви методи на плащане приемате?',
        answer: 'Приемаме плащане с дебитни и кредитни карти (Visa, Mastercard), както и наложен платеж. Всички онлайн плащания се обработват сигурно чрез Stripe.',
      },
      {
        question: 'Ще получа ли потвърждение за поръчката?',
        answer: 'Да, веднага след успешно завършване на поръчката ще получите имейл с потвърждение, съдържащ номера на поръчката и детайли за доставката.',
      },
    ],
  },
  {
    category: 'Доставка',
    questions: [
      {
        question: 'Колко време отнема доставката?',
        answer: 'Стандартната доставка отнема 3-5 работни дни след като продуктът бъде изработен. Времето за изработка зависи от сложността на продукта и обикновено е между 1-3 работни дни.',
      },
      {
        question: 'Колко струва доставката?',
        answer: 'Доставката до офис на куриер е 4.99 лв. Доставката до адрес е 6.99 лв. При поръчки над 50 лв. доставката е безплатна.',
      },
      {
        question: 'Мога ли да проследя поръчката си?',
        answer: 'Да, след изпращане на поръчката ще получите имейл с номер за проследяване, с който можете да следите статуса на доставката в реално време.',
      },
      {
        question: 'Доставяте ли извън България?',
        answer: 'В момента доставяме само на територията на България. Планираме да разширим доставката до други европейски държави в бъдеще.',
      },
    ],
  },
  {
    category: 'Продукти',
    questions: [
      {
        question: 'От какъв материал са направени продуктите?',
        answer: 'Нашите продукти са изработени от висококачествен PLA пластмас, който е биоразградим и екологичен. Някои продукти може да използват други материали като PETG или ABS за по-голяма издръжливост.',
      },
      {
        question: 'Водоустойчиви ли са продуктите?',
        answer: 'PLA е водоустойчив при кратък контакт с вода, но не е подходящ за постоянно излагане на влага. За продукти, които ще са в контакт с вода, използваме PETG материал.',
      },
      {
        question: 'Мога ли да поръчам персонализиран продукт?',
        answer: 'Да, предлагаме персонализирани поръчки. Свържете се с нас чрез формата за контакт с описание на желания продукт и ще ви изпратим оферта.',
      },
      {
        question: 'Как да се грижа за продуктите?',
        answer: 'Избягвайте директна слънчева светлина за продължително време и високи температури (над 50°C). Почиствайте с влажна кърпа. Не използвайте агресивни химикали.',
      },
    ],
  },
  {
    category: 'Връщане и гаранция',
    questions: [
      {
        question: 'Каква е вашата политика за връщане?',
        answer: 'Приемаме връщане в рамките на 14 дни от получаването, ако продуктът е в оригинално състояние и опаковка. Персонализираните продукти не подлежат на връщане, освен при дефект.',
      },
      {
        question: 'Какво да направя, ако получа дефектен продукт?',
        answer: 'Свържете се с нас в рамките на 48 часа от получаването със снимки на дефекта. Ще ви изпратим нов продукт безплатно или ще възстановим сумата по ваш избор.',
      },
      {
        question: 'Има ли гаранция на продуктите?',
        answer: 'Да, предлагаме 30-дневна гаранция за производствени дефекти. Гаранцията не покрива повреди от неправилна употреба или механични щети.',
      },
      {
        question: 'Как да върна продукт?',
        answer: 'Свържете се с нас за да получите инструкции за връщане. Ще ви изпратим етикет за куриер. След като получим продукта и проверим състоянието му, ще обработим възстановяването.',
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <span className="font-medium text-gray-900">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Често задавани въпроси
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Намерете отговори на най-често задаваните въпроси за нашите продукти и услуги
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
              <div className="bg-white rounded-2xl">
                {category.questions.map((faq) => (
                  <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Не намерихте отговор на въпроса си?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Свържете се с нас и ще ви отговорим възможно най-скоро.
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
