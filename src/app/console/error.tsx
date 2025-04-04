'use client';

import { useEffect } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/_common/ui/accordion';
import { Card, CardHeader, CardContent } from '@/components/_common/ui/card';
import { ScrollArea } from '@/components/_common/ui/scroll-area';
import { AlertCircle } from 'lucide-react';

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
    <main className="flex flex-col items-center justify-center h-full">
      <Card className="w-full max-w-4xl shadow-lg m-auto">
        <CardHeader className="p-4">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p>
            An unexpected error occurred. Please review the error details below
            for troubleshooting.
          </p>
        </CardHeader>
        <CardContent className="p-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="error-details">
              <AccordionTrigger className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded text-red-700">
                <AlertCircle className="h-6 w-6" />
                <div>
                  <h3 className="text-lg font-semibold">Error Occurred</h3>
                  <p className="text-sm">{error.message}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="max-h-40">
                  <pre className="text-sm text-red-800 whitespace-pre-wrap break-words p-2">
                    {error.stack}
                  </pre>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <div className="p-4">
          <button
            onClick={reset}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </Card>
    </main>
  );
}
