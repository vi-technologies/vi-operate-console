import Link from 'next/link';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { PanelLeft, Gauge, LineChart, Cog, Network, ServerCog } from 'lucide-react';

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs nav">
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
            className="link"
          >
            <Gauge className="h-5 w-5" />
            Dashboards
          </Link>
          <Link
            href="/reports"
            className="link"
          >
            <LineChart className="h-5 w-5" />
            Reports
          </Link>
          <Link
            href="/automations"
            className="link"
          >
            <Cog className="h-5 w-5" />
            Automations
          </Link>
          <Link
            href="/archetypes"
            className="link"
          >
            <Network className="h-5 w-5" />
            Archetypes
          </Link>
          <Link
            href="/sources"
            className="link"
          >
            <ServerCog className="h-5 w-5" />
            Sources
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
