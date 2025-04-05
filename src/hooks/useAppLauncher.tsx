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

interface AppItem {
  name: string;
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
      name: 'Console',
      icon: <LayoutDashboard size={20} />,
      url: '/console/dashboards',
      platform: 'operate',
      category: 'core'
    },
    {
      name: 'Reports',
      icon: <LineChart size={20} />,
      url: '/console/reports',
      platform: 'operate',
      category: 'core'
    },
    {
      name: 'Automate',
      icon: <Cog size={20} />,
      url: '/console/automations/create',
      platform: 'operate',
      category: 'core'
    },
    {
      name: 'Archetypes',
      icon: <Network size={20} />,
      url: '/console/archetypes',
      platform: 'operate',
      category: 'core'
    },
    {
      name: 'Sources',
      icon: <ServerCog size={20} />,
      url: '/console/sources',
      platform: 'operate',
      category: 'core'
    },

    // Vi Acquire - Customer Acquisition Platform
    {
      name: 'Campaigns',
      icon: <Target size={20} />,
      url: '/acquire/campaigns',
      platform: 'acquire',
      category: 'core'
    },
    {
      name: 'Audiences',
      icon: <Users size={20} />,
      url: '/acquire/audiences',
      platform: 'acquire',
      category: 'core'
    },
    {
      name: 'Analytics',
      icon: <BarChart4 size={20} />,
      url: '/acquire/analytics',
      platform: 'acquire',
      category: 'core'
    },
    {
      name: 'Leads',
      icon: <SearchCheck size={20} />,
      url: '/acquire/leads',
      platform: 'acquire',
      category: 'core'
    },
    {
      name: 'Conversions',
      icon: <Handshake size={20} />,
      url: '/acquire/conversions',
      platform: 'acquire',
      category: 'core'
    },
    {
      name: 'Channels',
      icon: <Megaphone size={20} />,
      url: '/acquire/channels',
      platform: 'acquire',
      category: 'core'
    },
    {
      name: 'Performance',
      icon: <LineChart size={20} />,
      url: '/acquire/performance',
      platform: 'acquire',
      category: 'core'
    },

    // Vi Engage - Customer Engagement Platform
    {
      name: 'Messaging',
      icon: <MessageSquare size={20} />,
      url: '/engage/messaging',
      platform: 'engage',
      category: 'core'
    },
    {
      name: 'Campaigns',
      icon: <Mail size={20} />,
      url: '/engage/campaigns',
      platform: 'engage',
      category: 'core'
    },
    {
      name: 'Journey',
      icon: <Network size={20} />,
      url: '/engage/journey',
      platform: 'engage',
      category: 'core'
    },
    {
      name: 'Insights',
      icon: <Sparkle size={20} />,
      url: '/engage/insights',
      platform: 'engage',
      category: 'core'
    },
    {
      name: 'AI Chat',
      icon: <Bot size={20} />,
      url: '/engage/ai-chat',
      platform: 'operate',
      category: 'coming-soon'
    },
    {
      name: 'Loyalty',
      icon: <Gift size={20} />,
      url: '/engage/loyalty',
      platform: 'engage',
      category: 'core'
    },
    {
      name: 'Revenue',
      icon: <Banknote size={20} />,
      url: '/engage/revenue',
      platform: 'engage',
      category: 'core'
    },

    // Coming Soon Features
    {
      name: 'Knowledge',
      icon: <BookOpen size={20} />,
      url: '/knowledge',
      platform: 'operate',
      category: 'coming-soon'
    },
    {
      name: 'Marketplace',
      icon: <ShoppingBag size={20} />,
      url: '/marketplace',
      platform: 'acquire',
      category: 'coming-soon'
    },
    {
      name: 'Community',
      icon: <Users size={20} />,
      url: '/community',
      platform: 'operate',
      category: 'coming-soon'
    },
    {
      name: 'Scheduling',
      icon: <CalendarClock size={20} />,
      url: '/console/scheduling',
      platform: 'operate',
      category: 'coming-soon'
    },
    {
      name: 'Call Center',
      icon: <Phone size={20} />,
      url: '/console/industries/call-center',
      platform: 'acquire',
      category: 'coming-soon'
    },
    {
      name: 'Healthcare',
      icon: <HeartPulse size={20} />,
      url: '/console/industries/healthcare',
      platform: 'operate',
      category: 'coming-soon'
    },
    {
      name: 'Manufacturing',
      icon: <Factory size={20} />,
      url: '/console/industries/manufacturing',
      platform: 'engage',
      category: 'coming-soon'
    },
    {
      name: 'Workspace',
      icon: <Briefcase size={20} />,
      url: '/console/workspace',
      platform: 'operate',
      category: 'coming-soon'
    }
  ];

  return {
    apps
  };
}
