'use client';

export default function Protected() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900">Protected Page</h1>
        <p className="mt-2 text-gray-600">
          You have successfully accessed the protected page with a valid API key.
        </p>
      </div>
    </div>
  );
} 