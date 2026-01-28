'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate newsletter signup
    // In production, you would integrate with your email service
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setStatus('success');
    setEmail('');
    
    // Reset status after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-light mb-2">Абонирайте се за бюлетина</h2>
          <p className="text-sm text-gray-600 mb-6">
            Бъдете първите, които научават за нови колекции и ексклузивни оферти.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-0">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Имейл"
                required
                disabled={status === 'loading'}
                className="w-full px-4 py-3 border border-gray-200 border-r-0 focus:outline-none focus:border-black transition-colors disabled:bg-gray-100"
              />
              <label className="sr-only">Имейл</label>
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-black text-white text-sm hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            >
              {status === 'loading' ? (
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              )}
            </button>
          </form>

          {status === 'success' && (
            <p className="mt-4 text-sm text-green-600">
              Благодарим ви за абонамента!
            </p>
          )}

          {status === 'error' && (
            <p className="mt-4 text-sm text-red-600">
              Нещо се обърка. Моля, опитайте отново.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
