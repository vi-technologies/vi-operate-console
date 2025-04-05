'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/_common/ui/popover';
import { ScrollArea } from '@/components/_common/ui/scroll-area';
import {
  LayoutDashboard,
  Grip,
  Cog,
  BookOpen,
  Users,
  LineChart,
  Briefcase,
  Network,
  ServerCog,
  Sparkle,
  HeartPulse,
  Building2,
  Factory,
  Truck,
  Store,
  ShoppingBag,
  CalendarClock,
  HardHat,
  Phone,
  SearchCheck,
  MessageSquare,
  Megaphone,
  Target,
  Mail,
  BarChart4,
  Bot,
  Gift,
  Banknote,
  Handshake
} from 'lucide-react';
import { Button } from './_common/ui/button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/_common/ui/tooltip';
import { Tabs, TabsList, TabsTrigger } from './_common/ui/tabs';
import { useAppLauncher, platformColors } from '@/hooks/useAppLauncher';

export function AppLauncher() {
  const [open, setOpen] = useState(false);
  const [activePlatform, setActivePlatform] = useState<
    'operate' | 'acquire' | 'engage'
  >('operate');

  const { apps } = useAppLauncher();
  const pathname = usePathname();

  // Filter apps based on active platform
  const filteredApps = apps.filter((app) => app.platform === activePlatform);

  const availableApps = filteredApps.filter(
    (app) => app.category !== 'coming-soon'
  );

  const comingSoonApps = filteredApps.filter(
    (app) => app.category === 'coming-soon'
  );

  return (
    <div className="relative p-0">
      <Popover open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full cursor-pointer"
                aria-label="App Launcher"
              >
                <Grip className="h-6 w-6" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>App Launcher</TooltipContent>
        </Tooltip>
        <PopoverContent
          className="w-[380px] p-0 nav rounded-none shadow-lg"
          align="end"
          sideOffset={8}
        >
          <Tabs
            defaultValue="operate"
            value={activePlatform}
            onValueChange={(value) =>
              setActivePlatform(value as 'operate' | 'acquire' | 'engage')
            }
            className="w-full nav rounded-lg shadow"
          >
            <div className="flex flex-col items-center">
              <img
                src="/assets/images/Logo.svg"
                alt="logo"
                height={50}
                width={50}
              />
            </div>
            <TabsList className="m-0 p-0 grid grid-cols-3 w-full rounded-none cursor-pointer bg-transparent transition-all banner">
              <TabsTrigger value="operate" className="link">
                Operate
              </TabsTrigger>
              <TabsTrigger value="acquire" className="link">
                Acquire
              </TabsTrigger>
              <TabsTrigger value="engage" className="link">
                Engage
              </TabsTrigger>
            </TabsList>
            <ScrollArea className="h-auto py-4 grid grid-cols-1 w-full overflow-x-visible overflow-visible banner">
              <div className="grid grid-cols-3 gap-2 pb-3">
                    {filteredApps.map((app) => (
                      <Tooltip key={app.name}>
                        <TooltipTrigger asChild>
                          <Link
                            href={app.url}
                            className={`flex flex-col items-center justify-center p-2 rounded transition-colors ${
                              pathname === app.url ? 'app-selected' : 'text-muted-foreground hover:text-white'
                            } ${app.category === 'coming-soon' ? 'cursor-not-allowed' : ''}`}
                          >
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                app.category === 'coming-soon' ? \`\${platformColors[app.platform]} opacity-70\` : platformColors[app.platform]
                              }`}
                            >
                              {app.icon}
                            </div>
                            <span className="mt-1 text-xs font-medium text-center">
                              {app.name}
                            </span>
                            {app.category === 'coming-soon' && (
                              <span className="mt-1 text-[9px] px-1 py-0.5 bg-gray-800 text-gray-400 rounded-full">
                                Soon
                              </span>
                            )}
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={5}>
                          {app.tooltip}
                        </TooltipContent>
                      </Tooltip>
                    ))}
              </div>
            </ScrollArea>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
}
