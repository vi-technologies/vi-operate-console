'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/_common/ui/popover';
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
  Sparkle
} from 'lucide-react';
import { Button } from './_common/ui/button';

interface AppItem {
  name: string;
  icon: React.ReactNode;
  url: string;
}

export function AppLauncher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const apps: AppItem[] = [
    {
      name: 'Workspace',
      icon: <Briefcase size={24} />,
      url: '/console/workspace'
    },
    {
      name: 'Console',
      icon: <LayoutDashboard size={24} />,
      url: '/console/dashboards'
    },
    {
      name: 'Reports',
      icon: <LineChart size={24} />,
      url: '/console/reports'
    },
    {
      name: 'Automate',
      icon: <Cog size={24} />,
      url: '/console/automations/create'
    },
    {
      name: 'Archetypes',
      icon: <Network size={24} />,
      url: '/console/archetypes'
    },
    {
      name: 'Sources',
      icon: <ServerCog size={24} />,
      url: '/console/sources'
    },
    {
      name: 'Community',
      icon: <Users size={24} />,
      url: '/console/community'
    },
    {
      name: 'Insights',
      icon: <Sparkle size={24} />,
      url: '/console/insights'
    },
    {
      name: 'Knowledge',
      icon: <BookOpen size={24} />,
      url: '/console/knowledge'
    }
  ];

  // Close the popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
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
        <PopoverContent className="w-[280px] p-2" align="end">
          <div className="grid grid-cols-3 gap-2 p-2">
            {apps.map((app) => (
              <a
                key={app.name}
                href={app.url}
                className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full">
                  {app.icon}
                </div>
                <span className="mt-1 text-xs">{app.name}</span>
              </a>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
