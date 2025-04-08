'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { seededRandom } from '@/lib/utils/random';
import { cn } from '@/lib/utils';

export function AnimatedBackground({ className }: { className?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [initialized, setInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);

  const backgroundElements = useMemo(() => {
    const random = seededRandom(123456);

    return Array.from({ length: 15 }).map((_, i) => ({
      width: random() * 300 + 50,
      height: random() * 300 + 50,
      left: random() * 100,
      top: random() * 100,
      opacity: random() * 0.5,
      depth: random() * 0.15 + 0.05,
      rotationFactor: random() * 10 - 5,
      movementAmplitude: random() * 1.5 + 0.5,
      movementSpeed: random() * 0.5 + 0.8,
      floatPhase: random() * Math.PI * 2
    }));
  }, []);

  const floatingIcons = useMemo(() => {
    const random = seededRandom(789012);
    const iconComponents = Array.from({ length: 10 }).map(() => {
      return {
        size: random() * 30 + 15
      };
    });

    return iconComponents.map((icon, i) => {
      const sector = i % 4;
      let baseLeft, baseTop;

      if (sector === 0) {
        baseLeft = random() * 40 + 5;
        baseTop = random() * 40 + 5;
      } else if (sector === 1) {
        baseLeft = random() * 40 + 55;
        baseTop = random() * 40 + 5;
      } else if (sector === 2) {
        baseLeft = random() * 40 + 5;
        baseTop = random() * 40 + 55;
      } else {
        baseLeft = random() * 40 + 55;
        baseTop = random() * 40 + 55;
      }

      return {
        ...icon,
        left: baseLeft,
        top: baseTop,
        depth: random() * 0.3 + 0.1,
        opacity: random() * 0.6 + 0.2,
        rotationSpeed: random() * 0.5 - 0.25,
        orbitRadius: random() * 50 + 20,
        orbitSpeed: random() * 0.15 + 0.05,
        orbitPhase: random() * Math.PI * 2,
        bounceHeight: random() * 30 + 15,
        bounceSpeed: random() * 0.15 + 0.1,
        bouncePhase: random() * Math.PI * 2,
        color: random() > 0.7 ? 'bg-purple-500' : 'bg-violet-400/50',
        zIndex: Math.floor(random() * 10) + 10
      };
    });
  }, []);

  const computeBackgroundStyle = (elem: any, t: number, mousePos: { x: number, y: number }) => {
    const floatY = Math.sin(t * elem.movementSpeed + elem.floatPhase) * elem.movementAmplitude * 15;
    const floatX = Math.cos(t * elem.movementSpeed + elem.floatPhase) * elem.movementAmplitude * 10;
    const shiftX = mousePos.x * elem.depth * 150 + floatX;
    const shiftY = mousePos.y * elem.depth * 150 + floatY;
    const rotateX = mousePos.y * elem.rotationFactor;
    const rotateY = -mousePos.x * elem.rotationFactor;
    const rotateZ = mousePos.x * mousePos.y * elem.rotationFactor * 2;
    const translateZ = elem.depth * mousePos.x * mousePos.y * 50;
    
    return {
      width: `${Math.round(elem.width * 100) / 100}px`,
      height: `${Math.round(elem.height * 100) / 100}px`,
      left: `${Math.round(elem.left * 100) / 100}%`,
      top: `${Math.round(elem.top * 100) / 100}%`,
      opacity: Math.round(elem.opacity * 1000) / 1000,
      transform: `translate3d(${Math.round(shiftX * 100) / 100}px, ${Math.round(shiftY * 100) / 100}px, ${Math.round(translateZ * 100) / 100}px) rotateX(${Math.round(rotateX * 100) / 100}deg) rotateY(${Math.round(rotateY * 100) / 100}deg) rotateZ(${Math.round(rotateZ * 100) / 100}deg)`,
      filter: `blur(${Math.round(elem.depth * 15 * 100) / 100}px)`,
      boxShadow: `0 0 ${Math.round(elem.depth * 50 * 100) / 100}px rgba(139, 92, 246, 0.3)`,
      backfaceVisibility: 'hidden' as const,
      transformStyle: 'preserve-3d' as const
    };
  };

  const computeIconStyle = (iconData: any, t: number, mousePos: { x: number, y: number }, index: number) => {
    const orbitX = Math.cos(t * iconData.orbitSpeed + iconData.orbitPhase) * iconData.orbitRadius;
    const orbitY = Math.sin(t * iconData.orbitSpeed + iconData.orbitPhase) * iconData.orbitRadius;
    const bounce = Math.sin(t * iconData.bounceSpeed + iconData.bouncePhase) * iconData.bounceHeight;
    const mouseX = mousePos.x * iconData.depth * 40;
    const mouseY = mousePos.y * iconData.depth * 40;
    const rotation = t * iconData.rotationSpeed * 360;
    const translateZ = iconData.depth * 100 + bounce;
    const iconRandom = seededRandom(1000 + index);
    const hasBoxShadow = iconRandom() > 0.5;
    const boxShadowSize = Math.round((iconRandom() * 10 + 5) * 100) / 100;
    const shadowOpacity = Math.round((0.3 + Math.sin(t * 0.4) * 0.2) * 100) / 100;
    
    return {
      left: `${Math.round(iconData.left * 100) / 100}%`,
      top: `${Math.round(iconData.top * 100) / 100}%`,
      opacity: Math.round(iconData.opacity * 1000) / 1000,
      transform: `translate3d(${Math.round((orbitX + mouseX) * 100) / 100}px, ${Math.round((orbitY + mouseY) * 100) / 100}px, ${Math.round(translateZ * 100) / 100}px) rotate(${Math.round(rotation * 100) / 100}deg)`,
      filter: `blur(${Math.round((1 - iconData.depth) * 2 * 100) / 100}px)`,
      zIndex: iconData.zIndex,
      boxShadow: hasBoxShadow ? `0 0 ${boxShadowSize}px rgba(139, 92, 246, ${shadowOpacity})` : 'none',
      transition: 'none',
      transformStyle: 'preserve-3d' as const,
      width: `${Math.round(iconData.size * 100) / 100}px`,
      height: `${Math.round(iconData.size * 100) / 100}px`,
      borderRadius: '50%'
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
      {backgroundElements.map((elem, i) => {
        const bgStyle = computeBackgroundStyle(elem, time, mousePosition);
        return (
          <div
            key={`bg-${i}`}
            className="absolute bg-violet-800 shadow-lg rounded-lg"
            style={{ ...bgStyle, transition: 'none' }}
          />
        );
      })}

      {floatingIcons.map((icon, i) => {
        const iconStyle = computeIconStyle(icon, time, mousePosition, i);
        return (
          <div
            key={`icon-${i}`}
            className={`absolute ${icon.color}`}
            style={iconStyle}
          />
        );
      })}
    </div>
  );
}
