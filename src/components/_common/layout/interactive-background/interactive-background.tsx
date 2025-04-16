'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { seededRandom } from '@/lib/utils/random';
import { cn } from '@/lib/utils';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/_common/ui/hover-card';
import { 
  BarChart3, 
  LineChart as LineChartIcon, 
  Shield, 
  Database, 
  Zap 
} from 'lucide-react';

export function InteractiveBackground({ className }: { className?: string }) {
  const [initialized, setInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeElement, setActiveElement] = useState<number | null>(null);


  const interactiveElements = useMemo(() => {
    const random = seededRandom(654321);


    return Array.from({ length: 5 }).map((_, i) => {
      // Position elements in different areas of the screen
      let x, y;
      if (i === 0) { // Top left
        x = 15;
        y = 15;
      } else if (i === 1) { // Top right
        x = 85;
        y = 15;
      } else if (i === 2) { // Center
        x = 50;
        y = 50;
      } else if (i === 3) { // Bottom left
        x = 15;
        y = 85;
      } else { // Bottom right
        x = 85;
        y = 85;
      }

      // Create different titles and icons for each element
      const titles = [
        { title: 'Performance', icon: 'BarChart3' },
        { title: 'Analytics', icon: 'LineChart' },
        { title: 'Security', icon: 'Shield' },
        { title: 'Storage', icon: 'Database' },
        { title: 'Automation', icon: 'Zap' }
      ];
      
      const elementInfo = titles[i];
      
      return {
        x,
        y,
        size: 120,
        color: `rgba(${Math.floor(random() * 100 + 100)}, ${Math.floor(random() * 50 + 50)}, ${Math.floor(random() * 200 + 50)}, 0.15)`,
        title: elementInfo.title,
        icon: elementInfo.icon,
        content: `${elementInfo.title} Metrics`,
        hoverContent: (
          <div className="p-4">
            <h3 className="text-lg font-medium mb-2">{elementInfo.title} Dashboard</h3>
            <p className="text-sm text-white/70">
              View detailed {elementInfo.title.toLowerCase()} metrics and analytics.
            </p>
            <div className="mt-2 flex gap-2">
              <button className="px-3 py-1 bg-primary/20 rounded-md text-sm hover:bg-primary/30 transition-colors">
                View Details
              </button>
              <button className="px-3 py-1 bg-primary/20 rounded-md text-sm hover:bg-primary/30 transition-colors">
                Configure
              </button>
            </div>
          </div>
        )
      };
    });
  }, []);

  useEffect(() => {
    setInitialized(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(`absolute inset-0 overflow-hidden ${!initialized ? 'opacity-0' : 'opacity-100'}`, className)}
      style={{ transition: 'opacity 0.5s ease-in' }}
    >
      {/* Interactive elements */}
      {interactiveElements.map((elem, i) => {
        const isActive = activeElement === i;
        
        return (
          <HoverCard key={`interactive-${i}`} openDelay={100} closeDelay={300}>
            <HoverCardTrigger asChild>
              <div
                className="absolute flex flex-col text-white font-medium border border-gray-800 backdrop-blur-sm"
                style={{
                  width: `${elem.size}px`,
                  height: `${elem.size * 0.6}px`,
                  left: `${elem.x}%`,
                  top: `${elem.y}%`,
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: elem.color,
                  borderRadius: '12px',
                  opacity: isActive ? 0.9 : 0.6,
                  boxShadow: isActive ? '0 0 30px rgba(139, 92, 246, 0.5)' : '0 0 20px rgba(139, 92, 246, 0.3)',
                  transition: 'opacity 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                  cursor: 'pointer',
                  zIndex: 10,
                  transform: isActive ? 'translate(-50%, -50%) scale(1.05)' : 'translate(-50%, -50%)'
                }}
                onMouseEnter={() => setActiveElement(i)}
                onMouseLeave={() => setActiveElement(null)}
              >
                <div className="relative z-10 p-4">
                  <div className="flex items-center mb-2">
                    {elem.icon === 'BarChart3' && <BarChart3 className="w-5 h-5 mr-2 text-primary" />}
                    {elem.icon === 'LineChart' && <LineChartIcon className="w-5 h-5 mr-2 text-primary" />}
                    {elem.icon === 'Shield' && <Shield className="w-5 h-5 mr-2 text-primary" />}
                    {elem.icon === 'Database' && <Database className="w-5 h-5 mr-2 text-primary" />}
                    {elem.icon === 'Zap' && <Zap className="w-5 h-5 mr-2 text-primary" />}
                    <h3 className="font-medium">{elem.title}</h3>
                  </div>
                  <p className="text-sm text-white/70">{elem.content}</p>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-gray-900/95 border-gray-700 text-white">
              {elem.hoverContent}
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
}
