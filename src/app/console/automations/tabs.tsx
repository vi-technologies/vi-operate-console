import { useAutomationTabs } from '@/hooks/useAutomations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import clsx from 'clsx';

export default function AutomationTabs() {
  const { tabs } = useAutomationTabs();

  return (
    <Tabs defaultValue="workflows" className="w-full">
      <TabsList className="flex gap-2 w-full h-auto">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.name} value={tab.id} className="tab-trigger">
            <div
              className={`h-8 w-8 rounded-full ${tab.iconBg} flex items-center justify-center`}
            >
              <tab.icon className={`h-6 w-6 ${tab.iconColor}`} />
            </div>
            <span>{tab.name}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.name} value={tab.id} children={tab.children} />
      ))}
    </Tabs>
  );
}
