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
import { AccordionHeader } from '@radix-ui/react-accordion';

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
      <Card className="w-full max-w-4xl shadow-lg m-auto bg-red-800">
        <CardHeader className="p-4 text-white">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p>
            An unexpected error occurred. Please review the error details below
            for troubleshooting.
          </p>
        </CardHeader>
        <CardContent className="p-4">
          <Accordion
            type="single"
            collapsible
            className="w-full border-red-200 rounded text-red-700 bg-red-50 border"
          >
            <AccordionItem value="error-details">
              <AccordionTrigger className="flex justify-between items-center gap-2 p-4 cursor-help">
                <AlertCircle className="h-6 w-6" />
                <div className="flex flex-col text-center">
                  <h3 className="text-lg font-semibold">Error Occurred</h3>
                  <p className="text-sm">{error.message}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="max-h-80">
                  <pre className="text-sm text-red-800 whitespace-pre-wrap break-words p-2">
                    {error.stack}
                  </pre>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <div className="px-4">
          <button
            onClick={reset}
            className="px-4 py-2  text-white rounded bg-red-950 hover:bg-red-700 w-full "
          >
            Try Again
          </button>
        </div>
      </Card>
    </main>
  );
}
