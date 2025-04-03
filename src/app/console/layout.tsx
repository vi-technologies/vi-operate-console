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

function DesktopNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-24 flex-col border-r bg-background sm:flex" style={{
      backgroundColor: '#140923'
    }}>
      <nav className="flex flex-col items-center gap-8 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-14 w-14 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground"
        >
          <span className="font-poppins font-bold text-white text-xl">VI</span>
          <span className="sr-only">VI Operate</span>
        </Link>

        <NavItem href="/console/dashboards" label="Dashboards">
          <Gauge className="h-10 w-10" />
        </NavItem>

        <NavItem href="/console/reports" label="Reports">
          <LineChart className="h-10 w-10" />
        </NavItem>

        <NavItem href="/console/automations" label="Automations">
          <Cog className="h-10 w-10" />
        </NavItem>

        <NavItem href="/console/archetypes" label="Archetypes">
          <Network className="h-10 w-10" />
        </NavItem>

        <NavItem href="/console/sources" label="Sources">
          <ServerCog className="h-10 w-10" />
        </NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-poppins">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/"
            className="group flex h-14 w-14 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground"
          >
            <span className="font-poppins font-bold text-white text-xl">VI</span>
            <span className="sr-only">VI Operate</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground font-poppins"
          >
            <Gauge className="h-5 w-5" />
            Dashboards
          </Link>
          <Link
            href="/reports"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground font-poppins"
          >
            <LineChart className="h-5 w-5" />
            Reports
          </Link>
          <Link
            href="/automations"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground font-poppins"
          >
            <Cog className="h-5 w-5" />
            Automations
          </Link>
          <Link
            href="/archetypes"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground font-poppins"
          >
            <Network className="h-5 w-5" />
            Archetypes
          </Link>
          <Link
            href="/sources"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground font-poppins"
          >
            <ServerCog className="h-5 w-5" />
            Sources
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

