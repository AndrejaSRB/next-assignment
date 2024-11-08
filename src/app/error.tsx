'use client';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-4 text-4xl font-bold">Something went wrong!</h2>

      <p className="mb-8 text-lg text-gray-400">
        {process.env.NODE_ENV === 'development'
          ? error.message
          : 'An error occurred while loading this page.'}
      </p>

      <button
        onClick={reset}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}
