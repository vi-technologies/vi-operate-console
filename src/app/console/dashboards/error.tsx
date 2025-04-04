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
      <div className="max-w-xl w-full bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Setup Required</h1>
        <p className="mb-4">
          We detected that your database is not yet configured. Please follow the instructions below to set up your environment.
        </p>
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Create the Users Table</h2>
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
          <h2 className="font-semibold mb-2">Insert a Test Row</h2>
          <pre className="p-4 bg-gray-800 text-white rounded overflow-auto text-sm">
            <code>
              {`INSERT INTO users (id, email, name, username) VALUES (1, 'me@site.com', 'Me', 'username');`}
            </code>
          </pre>
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
