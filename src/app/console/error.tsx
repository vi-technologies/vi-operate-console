'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-xl w-full bg-white shadow rounded-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p>
          An unexpected error occurred. Please review the error details below for troubleshooting.
        </p>
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="font-semibold mb-2 text-red-700">Error Details:</h2>
          <pre className="text-sm text-red-800 whitespace-pre-wrap break-words">
            {error.message}
          </pre>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Setup Instructions</h2>
          <p className="mb-4">
            It seems your database might not be properly configured. Please follow these instructions:
          </p>
          <div className="mb-4">
            <h3 className="font-semibold">Create the Users Table</h3>
            <pre className="p-4 bg-gray-800 text-white rounded overflow-auto text-sm">
              <code>
                {`CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  username VARCHAR(255)
);`}
              </code>
            </pre>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Insert a Test Row</h3>
            <pre className="p-4 bg-gray-800 text-white rounded overflow-auto text-sm">
              <code>
                {`INSERT INTO users (id, email, name, username) VALUES (1, 'me@site.com', 'Me', 'username');`}
              </code>
            </pre>
          </div>
        </div>
        <button
          onClick={reset}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
