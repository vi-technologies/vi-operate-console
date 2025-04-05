import { Tab } from '@/hooks/useAutomations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';

type Props = {
  tabs: Tab[];
};

export default function BigButtonTabs({ tabs }: Props) {
  const [defaults] = tabs;

  return (
    <Tabs defaultValue={defaults.value}>
      <TabsList className="flex gap-2 w-full h-auto">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.name}
            value={tab.value}
            className={`tab-trigger ${tab.hover} border-2`}
          >
            <div
              className={`h-24 w-24 rounded-full ${tab.iconBg} flex items-center justify-center`}
            >
              <tab.icon className={`${tab.iconColor}`} width={40} height={40} style={{ width: '40px', height: '40px' }} />
            </div>
            <span>{tab.name}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.name} value={tab.value} children={tab.children} />
      ))}
    </Tabs>
  );
}
