import { useAutomationTabs } from '@/hooks/useAutomations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';

export default function AutomationTabs() {
  const { tabs } = useAutomationTabs();

  return (
    <Tabs defaultValue="workflows" className="w-full">
      <TabsList className="flex gap-2 w-full mb-4">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.name}
            value={tab.id}
            className="flex items-center gap-1 border border-gray-300 text-gray-700 rounded-md px-3 py-2 hover:bg-gray-50 transition-colors duration-200"
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
