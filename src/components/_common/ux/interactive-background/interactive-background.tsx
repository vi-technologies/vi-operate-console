'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { seededRandom } from '@/lib/utils/random';
import { cn } from '@/lib/utils';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/_common/ui/hover-card';

interface InteractiveElementProps {
  x: number;
  y: number;
  size: number;
  depth: number;
  color: string;
  content: React.ReactNode;
  hoverContent: React.ReactNode;
}

export function InteractiveBackground({ className }: { className?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [initialized, setInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);
  const activeElementRef = useRef<number | null>(null);
  const setActiveElement = (index: number | null) => {
    activeElementRef.current = index;
  };

  const interactiveElements = useMemo(() => {
    const random = seededRandom(654321);

    return Array.from({ length: 5 }).map((_, i) => {
      // Position elements in different areas of the screen
      let x, y;
      if (i === 0) { // Top left
        x = random() * 20 + 5;
        y = random() * 20 + 5;
      } else if (i === 1) { // Top right
        x = random() * 20 + 75;
        y = random() * 20 + 5;
      } else if (i === 2) { // Center
        x = random() * 20 + 40;
        y = random() * 20 + 40;
      } else if (i === 3) { // Bottom left
        x = random() * 20 + 5;
        y = random() * 20 + 75;
      } else { // Bottom right
        x = random() * 20 + 75;
        y = random() * 20 + 75;
      }

      return {
        x,
        y,
        size: random() * 100 + 50,
        depth: random() * 0.3 + 0.1,
        rotationFactor: random() * 10 - 5,
        movementAmplitude: random() * 1.5 + 0.5,
        movementSpeed: random() * 0.5 + 0.8,
        floatPhase: random() * Math.PI * 2,
        color: `rgba(${Math.floor(random() * 100 + 100)}, ${Math.floor(random() * 50 + 50)}, ${Math.floor(random() * 200 + 50)}, 0.2)`,
        content: `Interactive Element ${i + 1}`,
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

  const computeElementStyle = (elem: any, t: number, mousePos: { x: number, y: number }, isActive: boolean) => {
    const floatY = Math.sin(t * elem.movementSpeed + elem.floatPhase) * elem.movementAmplitude * 15;
    const floatX = Math.cos(t * elem.movementSpeed + elem.floatPhase) * elem.movementAmplitude * 10;
    
    // Add more movement when element is active
    const activeMultiplier = isActive ? 2 : 1;
    const shiftX = mousePos.x * elem.depth * 150 * activeMultiplier + floatX;
    const shiftY = mousePos.y * elem.depth * 150 * activeMultiplier + floatY;
    
    const rotateX = mousePos.y * elem.rotationFactor * activeMultiplier;
    const rotateY = -mousePos.x * elem.rotationFactor * activeMultiplier;
    const rotateZ = mousePos.x * mousePos.y * elem.rotationFactor * 2 * activeMultiplier;
    const translateZ = elem.depth * mousePos.x * mousePos.y * 50 * activeMultiplier;
    
    return {
      width: `${Math.round(elem.size * 100) / 100}px`,
      height: `${Math.round(elem.size * 100) / 100}px`,
      left: `${Math.round(elem.x * 100) / 100}%`,
      top: `${Math.round(elem.y * 100) / 100}%`,
      backgroundColor: elem.color,
      transform: `translate3d(${Math.round(shiftX * 100) / 100}px, ${Math.round(shiftY * 100) / 100}px, ${Math.round(translateZ * 100) / 100}px) rotateX(${Math.round(rotateX * 100) / 100}deg) rotateY(${Math.round(rotateY * 100) / 100}deg) rotateZ(${Math.round(rotateZ * 100) / 100}deg)`,
      filter: `blur(${Math.round(elem.depth * (isActive ? 5 : 15) * 100) / 100}px)`,
      boxShadow: `0 0 ${Math.round(elem.depth * (isActive ? 100 : 50) * 100) / 100}px rgba(139, 92, 246, ${isActive ? 0.5 : 0.3})`,
      opacity: isActive ? 0.8 : 0.4,
      transition: 'filter 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
      cursor: 'pointer',
      borderRadius: '12px',
      backfaceVisibility: 'hidden' as const,
      transformStyle: 'preserve-3d' as const,
      zIndex: isActive ? 30 : 10
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 0.01);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    setInitialized(true);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(`absolute inset-0 overflow-hidden ${!initialized ? 'opacity-0' : 'opacity-100'}`, className)}
      style={{ transition: 'opacity 0.5s ease-in' }}
    >
      {/* Original animated background elements can go here */}
      
      {/* Interactive elements */}
      {interactiveElements.map((elem, i) => {
        const isActive = activeElementRef.current === i;
        const elemStyle = computeElementStyle(elem, time, mousePosition, isActive);
        
        return (
          <HoverCard key={`interactive-${i}`} openDelay={100} closeDelay={300}>
            <HoverCardTrigger asChild>
              <div
                className="absolute flex items-center justify-center text-white font-medium"
                style={elemStyle}
                onMouseEnter={() => {
                  requestAnimationFrame(() => setActiveElement(i));
                }}
                onMouseLeave={() => {
                  requestAnimationFrame(() => setActiveElement(null));
                }}
              >
                <div className="relative z-10 p-4 text-center">
                  <span className="opacity-70">{elem.content}</span>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-gray-900/95 border-gray-700 text-white backdrop-blur-md">
              {elem.hoverContent}
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
}
