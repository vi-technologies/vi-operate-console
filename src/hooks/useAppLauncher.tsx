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
  Handshake,
  FileText,
  Settings,
  Calendar,
  UserPlus,
  Bell,
  BookMarked,
  Lock,
  Award
} from 'lucide-react';

interface AppItem {
  name: string;
  tooltip: string;
  icon: React.ReactNode;
  url: string;
  platform: 'operate' | 'acquire' | 'engage';
  category?: 'core' | 'industry' | 'coming-soon';
}

export function useAppLauncher(): {
  apps: AppItem[];
} {
  const apps: AppItem[] = [
    // Vi Operate - Workforce Management Platform
    {
      name: 'Ai Agent',
      tooltip: 'Automate tasks with AI (coming soon)',
      icon: <Bot size={20} />,
      url: '/console/ai-agent',
      platform: 'operate',
      category: 'coming-soon'
    },
    {
      name: 'Console',
      tooltip: 'Access your dashboard and controls',
      icon: <LayoutDashboard size={20} />,
      url: '/console/dashboards',
      platform: 'operate',
      category: 'core'
    },
    {
      name: 'Reports',
      tooltip: 'View detailed reports',
      icon: <LineChart size={20} />,
      url: '/console/reports',
      platform: 'operate',
      category: 'core'
    },
    {
      name: 'Automations',
      tooltip: 'Create and manage automations',
      icon: <Cog size={20} />,
      url: '/console/automations/create',
      platform: 'operate',
      category: 'core'
    },
    {
      name: 'Archetypes',
      tooltip: 'Configure archetypes for workflows',
      icon: <Network size={20} />,
      url: '/console/archetypes',
      platform: 'operate',
      category: 'core'
    },
    {
      name: 'Sources',
      tooltip: 'Manage your data sources',
      icon: <ServerCog size={20} />,
      url: '/console/sources',
      platform: 'operate',
      category: 'core'
    },
    // New Operate apps
    {
      name: 'Documents',
      tooltip: 'Manage organizational documents',
      icon: <FileText size={20} />,
      url: '/console/documents',
      platform: 'operate',
      category: 'core'
    },
    {
      name: 'Teams',
      tooltip: 'Manage team structures and members',
      icon: <Users size={20} />,
      url: '/console/teams',
      platform: 'operate',
      category: 'core'
    },
    {
      name: 'Settings',
      tooltip: 'Configure platform settings',
      icon: <Settings size={20} />,
      url: '/console/settings',
      platform: 'operate',
      category: 'core'
    },

    // Vi Acquire - Customer Acquisition Platform
    {
      name: 'Ai Agent',
      tooltip: 'Automate customer acquisition tasks (coming soon)',
      icon: <Bot size={20} />,
      url: '/acquire/ai-agent',
      platform: 'acquire',
      category: 'coming-soon'
    },
    {
      name: 'Campaigns',
      tooltip: 'Plan and execute campaigns',
      icon: <Target size={20} />,
      url: '/acquire/campaigns',
      platform: 'acquire',
      category: 'coming-soon'
    },
    {
      name: 'Audiences',
      tooltip: 'Target and analyze audiences',
      icon: <Users size={20} />,
      url: '/acquire/audiences',
      platform: 'acquire',
      category: 'coming-soon'
    },
    {
      name: 'Analytics',
      tooltip: 'Analyze performance metrics',
      icon: <BarChart4 size={20} />,
      url: '/acquire/analytics',
      platform: 'acquire',
      category: 'coming-soon'
    },
    {
      name: 'Leads',
      tooltip: 'Track and manage leads',
      icon: <SearchCheck size={20} />,
      url: '/acquire/leads',
      platform: 'acquire',
      category: 'coming-soon'
    },
    {
      name: 'Conversions',
      tooltip: 'Monitor conversion rates',
      icon: <Handshake size={20} />,
      url: '/acquire/conversions',
      platform: 'acquire',
      category: 'coming-soon'
    },
    {
      name: 'Channels',
      tooltip: 'Oversee marketing channels',
      icon: <Megaphone size={20} />,
      url: '/acquire/channels',
      platform: 'acquire',
      category: 'coming-soon'
    },
    {
      name: 'Performance',
      tooltip: 'Monitor campaign performance',
      icon: <LineChart size={20} />,
      url: '/acquire/performance',
      platform: 'acquire',
      category: 'coming-soon'
    },
    {
      name: 'Marketplace',
      tooltip: 'Explore the marketplace',
      icon: <ShoppingBag size={20} />,
      url: '/marketplace',
      platform: 'acquire',
      category: 'coming-soon'
    },

    // Vi Engage - Customer Engagement Platform
    {
      name: 'Ai Agent',
      tooltip: 'AI assistance for engagement (coming soon)',
      icon: <Bot size={20} />,
      url: '/engage/ai-agent',
      platform: 'engage',
      category: 'coming-soon'
    },
    {
      name: 'Messaging',
      tooltip: 'Manage messaging interactions',
      icon: <MessageSquare size={20} />,
      url: '/engage/messaging',
      platform: 'engage',
      category: 'coming-soon'
    },
    {
      name: 'Campaigns',
      tooltip: 'Engage through campaigns',
      icon: <Mail size={20} />,
      url: '/engage/campaigns',
      platform: 'engage',
      category: 'coming-soon'
    },
    {
      name: 'Journey',
      tooltip: 'Map out customer journeys',
      icon: <Network size={20} />,
      url: '/engage/journey',
      platform: 'engage',
      category: 'coming-soon'
    },
    {
      name: 'Insights',
      tooltip: 'Gain actionable insights',
      icon: <Sparkle size={20} />,
      url: '/engage/insights',
      platform: 'engage',
      category: 'coming-soon'
    },
    {
      name: 'Loyalty',
      tooltip: 'Boost customer loyalty',
      icon: <Gift size={20} />,
      url: '/engage/loyalty',
      platform: 'engage',
      category: 'coming-soon'
    },
    {
      name: 'Revenue',
      tooltip: 'Track revenue insights',
      icon: <Banknote size={20} />,
      url: '/engage/revenue',
      platform: 'engage',
      category: 'coming-soon'
    },
    // New Engage apps
    {
      name: 'Notifications',
      tooltip: 'Manage customer notifications',
      icon: <Bell size={20} />,
      url: '/engage/notifications',
      platform: 'engage',
      category: 'coming-soon'
    },
    {
      name: 'Knowledge Base',
      tooltip: 'Manage customer support resources',
      icon: <BookMarked size={20} />,
      url: '/engage/knowledge-base',
      platform: 'engage',
      category: 'coming-soon'
    }
  ];

  return {
    apps: apps
  };
}

export const platformColors = {
  operate: 'bg-blue-900 text-gray-200',
  acquire: 'bg-purple-900 text-gray-200',
  engage: 'bg-emerald-900 text-gray-200'
};
