import '@/styles/globals.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'VI Operate Console',
  description:
    'VI Operate Console for call center staffing with forecasting and scheduling'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col font-poppins">
        {children}
      </body>
      <Analytics />
    </html>
  );
}
