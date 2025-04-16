'use client';

import { Analytics } from '@vercel/analytics/react';
import { DynamicBreadcrumb } from '@/components/_common/navigation/dynamic-breadcrumb';
import { SearchInput } from './dashboards/search';
import { AppLauncher } from '@/components/_common/navigation/app-launcher';
import dynamic from 'next/dynamic';
const User = dynamic(() => import('./dashboards/user').then(mod => mod.ClientUser));
import Providers from './dashboards/providers';
import { usePathname } from 'next/navigation';
const DesktopNav = dynamic(
  () => import('@/components/_common/navigation/desktop-nav')
);
const MobileNav = dynamic(
  () => import('@/components/_common/navigation/mobile-nav')
);

export default function ConsoleLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Get the current path to determine if we're on the console home page
  const pathname = usePathname();
  const isConsolePage = pathname === '/console';

  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNav />
        <div className="flex flex-col gap-0 sm:ml-24">
          {!isConsolePage && (
            <header className="header">
              <MobileNav />
              <DynamicBreadcrumb />
              <SearchInput />
              <div className="flex items-center gap-2">
                <User />
                <AppLauncher />
              </div>
            </header>
          )}
          <main className={`grid flex-1 items-start ${isConsolePage ? '' : 'gap-2 p-4 sm:px-6 sm:py-0 md:gap-4'} bg-muted/40`}>
            {children}
          </main>
        </div>
        <Analytics />
      </main>
    </Providers>
  );
}
