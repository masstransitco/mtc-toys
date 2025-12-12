'use client';

import { useState, FormEvent } from 'react';
import { subscribeEmail } from '@/app/actions/subscribers';

export function EmailCapture({ ctaLabel }: { ctaLabel: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const result = await subscribeEmail(email, 'homepage');

    if (result.success) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Something went wrong');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-4">
        <p className="text-green-600 font-medium">Thank you!</p>
        <p className="text-gray-600 text-sm mt-1">
          We&apos;ll let you know when we launch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'loading'}
        className="flex-1 px-4 py-3 rounded-md border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {status === 'loading' ? 'Subscribing...' : ctaLabel}
      </button>
      {status === 'error' && (
        <p className="text-red-600 text-sm mt-2 sm:mt-0 sm:self-center">{errorMsg}</p>
      )}
    </form>
  );
}
