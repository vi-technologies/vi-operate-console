import Link from 'next/link';
import {
  BarChart,
  Cog,
  Gauge,
  Home,
  LineChart,
  Network,
  Package,
  Package2,
  PanelLeft,
  ServerCog,
  Settings,
  ShoppingCart,
  Users2
} from 'lucide-react';

import { Button } from '../../components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../../components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '../../components/ui/tooltip';
import { Analytics } from '@vercel/analytics/react';
import { User } from './dashboards/user';
import { VercelLogo } from '../../components/icons';
import Providers from './dashboards/providers';
import { NavItem } from './dashboards/nav-item';
import { SearchInput } from './dashboards/search';
import { DynamicBreadcrumb } from '../../components/dynamic-breadcrumb';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-24">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
            <DynamicBreadcrumb />
            <SearchInput />
            <User />
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



