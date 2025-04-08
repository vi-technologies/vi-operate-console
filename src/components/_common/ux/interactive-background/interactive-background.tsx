'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { seededRandom } from '@/lib/utils/random';
import { cn } from '@/lib/utils';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/_common/ui/hover-card';

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

      return {
        x,
        y,
        size: 80,
        color: `rgba(${Math.floor(random() * 100 + 100)}, ${Math.floor(random() * 50 + 50)}, ${Math.floor(random() * 200 + 50)}, 0.15)`,
        content: `Element ${i + 1}`,
        hoverContent: (
          <div className="p-4">
            <h3 className="text-lg font-medium mb-2">Element {i + 1}</h3>
            <p className="text-sm text-white/70">
              This is an interactive element in the background. You can hover and click on it.
            </p>
            <div className="mt-2 flex gap-2">
              <button className="px-3 py-1 bg-primary/20 rounded-md text-sm hover:bg-primary/30 transition-colors">
                Action 1
              </button>
              <button className="px-3 py-1 bg-primary/20 rounded-md text-sm hover:bg-primary/30 transition-colors">
                Action 2
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
                className="absolute flex items-center justify-center text-white font-medium"
                style={{
                  width: `${elem.size}px`,
                  height: `${elem.size}px`,
                  left: `${elem.x}%`,
                  top: `${elem.y}%`,
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: elem.color,
                  borderRadius: '12px',
                  opacity: isActive ? 0.8 : 0.4,
                  boxShadow: isActive ? '0 0 30px rgba(139, 92, 246, 0.5)' : '0 0 20px rgba(139, 92, 246, 0.3)',
                  transition: 'opacity 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  zIndex: 10
                }}
                onMouseEnter={() => setActiveElement(i)}
                onMouseLeave={() => setActiveElement(null)}
              >
                <div className="relative z-10 p-4 text-center">
                  <span className="opacity-70">{elem.content}</span>
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
