import Link from 'next/link';
import {
  Gauge,
  LineChart,
  Cog,
  Network,
  ServerCog,
  Settings
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { NavItem } from './nav-item';

export default function DesktopNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-24 flex-col border-r bg-background sm:flex nav">
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
          <TooltipContent side="right" className="font-poppins">
            Settings
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
