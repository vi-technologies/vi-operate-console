import { useAutomationTabs } from '@/hooks/useAutomations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';

export default function AutomationTabs() {
  const { tabs } = useAutomationTabs();

  return (
    <Tabs defaultValue="workflows" className="w-full">
      <TabsList className="grid grid-cols-6 w-full mb-4">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.name}
            value={tab.id}
            className="flex items-center gap-1"
          >
            {tab.icon}
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.name} value={tab.id} children={tab.children} />
      ))}
    </Tabs>
  );
}
