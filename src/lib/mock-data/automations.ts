import { Cog, Flower, Calendar, Layers, Cpu, Link2, Grid } from 'lucide-react';

export const automationTabsMockData = [
  {
    icon: Flower,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    hover: 'hover:border-indigo-600',
    name: 'Workflows',
    value: 'workflows'
  },
  {
    icon: Cpu,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    hover: 'hover:border-green-200',
    name: 'Agents',
    value: 'agents'
  },
  {
    icon: Calendar,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    hover: 'hover:border-blue-200',
    name: 'Cron Jobs',
    value: 'cron'
  },
  {
    icon: Layers,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    hover: 'hover:border-red-200',
    name: 'Triggered Events',
    value: 'events'
  },
  {
    icon: Link2,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    hover: 'hover:border-yellow-200',
    name: 'Live Data Streams',
    value: 'data'
  },
  {
    icon: Cog,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    hover: 'hover:border-purple-200',
    name: 'API Publishing',
    value: 'api'
  }
];
