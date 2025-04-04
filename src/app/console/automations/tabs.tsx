import { useAutomationTabs } from '@/hooks/useAutomations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';

export default function AutomationTabs() {
  const { tabs } = useAutomationTabs();

  return (
    <Tabs defaultValue="workflows" className="w-full">
      <TabsList className="flex flex-col gap-2 w-full mb-4">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.name}
            value={tab.id}
            className="flex items-center gap-3 w-full border border-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className={`h-8 w-8 rounded-full ${tab.iconBg} flex items-center justify-center`}>
              <tab.icon className={`h-5 w-5 ${tab.iconColor}`} />
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
