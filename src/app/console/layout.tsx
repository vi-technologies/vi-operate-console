import { Analytics } from '@vercel/analytics/react';
import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb';
import { SearchInput } from './dashboards/search';
import { User } from './dashboards/user';
import { AppLauncher } from '@/components/app-launcher';
import dynamic from 'next/dynamic';
import Providers from './dashboards/providers';
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
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNav />
        <div className="flex flex-col gap-0 sm:ml-24">
          <header className="header">
            <MobileNav />
            <DynamicBreadcrumb />
            <SearchInput />
            <div className="flex items-center gap-2">
              <User />
              <AppLauncher />
            </div>
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </main>
        </div>
        <Analytics />
      </main>
    </Providers>
  );
}
