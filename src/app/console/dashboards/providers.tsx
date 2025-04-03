'use client';

import { TooltipProvider } from '@/components/_common/ui/tooltip';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
