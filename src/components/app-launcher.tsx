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
import { Tabs, TabsList, TabsTrigger } from './_common/ui/tabs';
import { useAppLauncher } from '@/hooks/useAppLauncher';

export function AppLauncher() {
  const [open, setOpen] = useState(false);
  const [activePlatform, setActivePlatform] = useState<
    'operate' | 'acquire' | 'engage'
  >('operate');

  const { apps } = useAppLauncher();
  const pathname = usePathname();

  // Filter apps based on active platform
  const filteredApps = apps.filter((app) => app.platform === activePlatform);

  // Platform color schemes optimized for dark background
  const platformColors = {
    operate: 'bg-blue-600 text-white',
    acquire: 'bg-purple-600 text-white',
    engage: 'bg-emerald-600 text-white'
  };

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
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
        <PopoverContent className="w-[380px] p-0 nav" align="end" sideOffset={8}>
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
            <TabsList className="grid grid-cols-3 w-full rounded-none cursor-pointer bg-accent/40">
              <TabsTrigger value="operate">Operate</TabsTrigger>
              <TabsTrigger value="acquire">Acquire</TabsTrigger>
              <TabsTrigger value="engage">Engage</TabsTrigger>
            </TabsList>
          </Tabs>

          <ScrollArea className="h-auto">
            <div className="grid grid-cols-3 gap-2 p-3">
              {filteredApps.map((app) => (
                <Link
                  key={app.name}
                  href={app.url}
                  onClick={() => setOpen(false)}
                  className={`flex flex-col items-center justify-center p-2 rounded transition-colors ${
                    pathname === app.url ? 'app-selected' : 'text-muted-foreground hover:text-white'
                  } ${app.category === 'coming-soon' ? 'cursor-not-allowed pointer-events-none' : ''}`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full 
                    ${platformColors[app.platform]}
                    ${app.category === 'coming-soon' ? 'opacity-70' : ''}`}
                  >
                    {app.icon}
                  </div>
                  <span className="mt-1 text-xs font-medium text-center">
                    {app.name}
                  </span>
                  {app.category === 'coming-soon' && (
                    <span className="mt-1 text-[9px] px-1 py-0.5 bg-gray-800 text-gray-400 rounded-full cursor-not-allowed">
                      Soon
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}
