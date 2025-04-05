'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/_common/ui/button';
import { Radar, Search, Map, Compass, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  // Initialize with centered position (0,0) to avoid initial render jump
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [initialized, setInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to generate deterministic "random" values based on a seed
  const seededRandom = (seed: number) => {
    return () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  };

  // Generate stable random values for the background elements using a seed
  const backgroundElements = useMemo(() => {
    // Use a fixed seed for deterministic randomness
    const random = seededRandom(123456);

    return Array.from({ length: 15 }).map((_, i) => ({
      width: random() * 300 + 50,
      height: random() * 300 + 50,
      left: random() * 100,
      top: random() * 100,
      opacity: random() * 0.5,
      depth: random() * 0.15 + 0.05, // Random depth factor for parallax (increased range)
      rotationFactor: random() * 10 - 5, // Random rotation direction and intensity
      movementAmplitude: random() * 1.5 + 0.5, // Different movement amplitudes
      movementSpeed: random() * 0.5 + 0.8, // Different movement speeds
      floatPhase: random() * Math.PI * 2 // Random starting phase for the floating animation
    }));
  }, []);

  // Generate floating icons scattered across the screen with better distribution
  const floatingIcons = useMemo(() => {
    // Use a different seed for icons to get different random values than background
    const random = seededRandom(789012);

    const iconComponents = [
      Search,
      Map,
      Compass,
      Radar,
      Home,
      ArrowLeft,
      Search,
      Map,
      Compass,
      Radar
    ];

    const icons = iconComponents.map((Icon) => ({
      Icon,
      size: random() * 30 + 15
    }));

    // Create a grid-based distribution for better spacing
    return icons.map((icon, i) => {
      // Divide screen into zones to prevent overlapping
      const sector = i % 4; // 0, 1, 2, or 3 (quadrants)

      // Calculate baseline positions based on sector
      let baseLeft, baseTop;

      if (sector === 0) {
        baseLeft = random() * 40 + 5; // 5-45% (left side)
        baseTop = random() * 40 + 5; // 5-45% (top side)
      } else if (sector === 1) {
        baseLeft = random() * 40 + 55; // 55-95% (right side)
        baseTop = random() * 40 + 5; // 5-45% (top side)
      } else if (sector === 2) {
        baseLeft = random() * 40 + 5; // 5-45% (left side)
        baseTop = random() * 40 + 55; // 55-95% (bottom side)
      } else {
        baseLeft = random() * 40 + 55; // 55-95% (right side)
        baseTop = random() * 40 + 55; // 55-95% (bottom side)
      }

      return {
        ...icon,
        left: baseLeft,
        top: baseTop,
        depth: random() * 0.3 + 0.1,
        opacity: random() * 0.6 + 0.2,
        rotationSpeed: random() * 0.5 - 0.25,
        orbitRadius: random() * 50 + 20, // Increased radius for more movement
        orbitSpeed: random() * 0.15 + 0.05,
        orbitPhase: random() * Math.PI * 2,
        bounceHeight: random() * 30 + 15,
        bounceSpeed: random() * 0.15 + 0.1,
        bouncePhase: random() * Math.PI * 2,
        color: random() > 0.7 ? 'text-purple' : 'text-violet-400/50',
        zIndex: Math.floor(random() * 10) + 10 // Random z-index between 10-19
      };
    });
  }, []);

  // Add subtle floating animation
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 0.01);
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      // Calculate mouse position relative to container center (normalized from -1 to 1)
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track actual mouse position (not normalized) for cursor follow
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Initialize positions on component mount to prevent initial render jump
  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized) {
      // Set initial cursor position to the center of the screen
      setCursorPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      });
      setInitialized(true);
    }
  }, [initialized]);

  useEffect(() => {
    const handleCursorMove = (e: MouseEvent) => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleCursorMove);
    return () => window.removeEventListener('mousemove', handleCursorMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* No fixed cursor radar here anymore - it's been moved to the main content area */}
      {/* Background elements */}
      <div
        className={`absolute inset-0 overflow-hidden ${!initialized ? 'opacity-0' : 'opacity-100'}`}
        style={{ transition: 'opacity 0.5s ease-in' }}
      >
        {/* Background elements */}
        {backgroundElements.map((style, i) => {
          // Calculate floating movement
          const floatY =
            Math.sin(time * style.movementSpeed + style.floatPhase) *
            style.movementAmplitude *
            15;
          const floatX =
            Math.cos(time * style.movementSpeed + style.floatPhase) *
            style.movementAmplitude *
            10;

          // Calculate position shift based on mouse and depth
          const shiftX = mousePosition.x * style.depth * 150 + floatX;
          const shiftY = mousePosition.y * style.depth * 150 + floatY;

          // Calculate rotation based on mouse movement and element properties
          const rotateX = mousePosition.y * style.rotationFactor;
          const rotateY = -mousePosition.x * style.rotationFactor;
          const rotateZ =
            mousePosition.x * mousePosition.y * style.rotationFactor * 2;

          // Z-translation for more pronounced 3D effect
          const translateZ =
            style.depth * mousePosition.x * mousePosition.y * 50;

          // Round values to 2 decimal places to ensure server/client consistency
          const roundedWidth = Math.round(style.width * 100) / 100;
          const roundedHeight = Math.round(style.height * 100) / 100;
          const roundedLeft = Math.round(style.left * 100) / 100;
          const roundedTop = Math.round(style.top * 100) / 100;
          const roundedOpacity = Math.round(style.opacity * 1000) / 1000;
          const roundedShiftX = Math.round(shiftX * 100) / 100;
          const roundedShiftY = Math.round(shiftY * 100) / 100;
          const roundedTranslateZ = Math.round(translateZ * 100) / 100;
          const roundedRotateX = Math.round(rotateX * 100) / 100;
          const roundedRotateY = Math.round(rotateY * 100) / 100;
          const roundedRotateZ = Math.round(rotateZ * 100) / 100;
          const roundedBlur = Math.round(style.depth * 15 * 100) / 100;
          const roundedShadow = Math.round(style.depth * 50 * 100) / 100;

          return (
            <div
              key={`bg-${i}`}
              className="absolute bg-violet-800 shadow-lg rounded-lg"
              style={{
                width: `${roundedWidth}px`,
                height: `${roundedHeight}px`,
                left: `${roundedLeft}%`,
                top: `${roundedTop}%`,
                opacity: roundedOpacity,
                transform: `translate3d(${roundedShiftX}px, ${roundedShiftY}px, ${roundedTranslateZ}px) rotateX(${roundedRotateX}deg) rotateY(${roundedRotateY}deg) rotateZ(${roundedRotateZ}deg)`,
                transition: 'none',
                filter: `blur(${roundedBlur}px)`,
                boxShadow: `0 0 ${roundedShadow}px rgba(139, 92, 246, 0.3)`,
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d'
              }}
            />
          );
        })}

        {/* Floating icons scattered around */}
        {floatingIcons.map((icon, i) => {
          // Calculate complex movement pattern (orbiting + bouncing)
          const orbitX =
            Math.cos(time * icon.orbitSpeed + icon.orbitPhase) *
            icon.orbitRadius;
          const orbitY =
            Math.sin(time * icon.orbitSpeed + icon.orbitPhase) *
            icon.orbitRadius;
          const bounce =
            Math.sin(time * icon.bounceSpeed + icon.bouncePhase) *
            icon.bounceHeight;

          // Mouse influence based on depth
          const mouseX = mousePosition.x * icon.depth * 40;
          const mouseY = mousePosition.y * icon.depth * 40;

          // Rotation animation
          const rotation = time * icon.rotationSpeed * 360;

          // Z-translation for depth
          const translateZ = icon.depth * 100 + bounce;

          const { Icon } = icon;

          // Use a seeded random function based on the icon index for the boxShadow
          const iconRandom = seededRandom(1000 + i);
          const hasBoxShadow = iconRandom() > 0.5;
          const boxShadowSize = Math.round((iconRandom() * 10 + 5) * 100) / 100;
          const shadowOpacity =
            Math.round((0.3 + Math.sin(time * 0.4) * 0.2) * 100) / 100;

          // Round values to 2 decimal places
          const roundedLeft = Math.round(icon.left * 100) / 100;
          const roundedTop = Math.round(icon.top * 100) / 100;
          const roundedOpacity = Math.round(icon.opacity * 1000) / 1000;
          const roundedOrbitX = Math.round((orbitX + mouseX) * 100) / 100;
          const roundedOrbitY = Math.round((orbitY + mouseY) * 100) / 100;
          const roundedTranslateZ = Math.round(translateZ * 100) / 100;
          const roundedRotation = Math.round(rotation * 100) / 100;
          const roundedBlur = Math.round((1 - icon.depth) * 2 * 100) / 100;
          const roundedSize = Math.round(icon.size * 100) / 100;

          return (
            <div
              key={`icon-${i}`}
              className={`absolute ${icon.color}`}
              style={{
                left: `${roundedLeft}%`,
                top: `${roundedTop}%`,
                opacity: roundedOpacity,
                transform: `translate3d(${roundedOrbitX}px, ${roundedOrbitY}px, ${roundedTranslateZ}px) rotate(${roundedRotation}deg)`,
                filter: `blur(${roundedBlur}px)`,
                transition: 'none',
                transformStyle: 'preserve-3d',
                zIndex: icon.zIndex,
                boxShadow: hasBoxShadow
                  ? `0 0 ${boxShadowSize}px rgba(139, 92, 246, ${shadowOpacity})`
                  : 'none'
              }}
            >
              <Icon size={roundedSize} />
            </div>
          );
        })}
      </div>

      {/* Main content */}
      <div
        className={`relative z-20 text-center w-full h-full ${!initialized ? 'opacity-0' : 'opacity-100'}`}
        style={{
          perspective: '2000px',
          perspectiveOrigin: `${Math.round((50 + mousePosition.x * 10) * 100) / 100}% ${Math.round((50 + mousePosition.y * 10) * 100) / 100}%`,
          transformStyle: 'preserve-3d',
          transition: 'opacity 0.5s ease-in'
        }}
      >
        {/* Logo - floating and rotating with time animation only */}
        <div
          className="absolute"
          style={{
            left: `${48 + Math.sin(time * 0.7) * 5}%`,
            top: `${15 + Math.cos(time * 0.5) * 3}%`,
            transform: `translate(-50%, -50%) 
                       translate3d(0, 0, ${40 + Math.sin(time) * 20}px) 
                       rotateY(${Math.sin(time * 0.3) * 10}deg)
                       rotateZ(${Math.sin(time * 0.2) * 5}deg)`,
            transition: 'none',
            zIndex: 30
          }}
        >
          <img src="/assets/images/Logo.svg" alt="Logo" className="w-20" />
        </div>

        {/* 404 Text - Floating with time-based animation only */}
        <h1
          className="text-8xl font-extrabold text-white absolute"
          style={{
            left: `${50 + Math.sin(time * 0.3) * 3}%`,
            top: `${40 + Math.cos(time * 0.4) * 2}%`,
            transform: `translate(-50%, -50%) 
                       translate3d(0, 0, ${60 + Math.sin(time * 0.8) * 15}px) 
                       rotateX(${Math.sin(time * 0.2) * 5}deg)
                       rotateY(${Math.sin(time * 0.3) * 5}deg)
                       rotateZ(${Math.sin(time * 0.1) * 2}deg)`,
            textShadow: `0px 0px 10px rgba(0, 0, 0, 0.5)`,
            transition: 'none',
            zIndex: 25
          }}
        >
          404
        </h1>

        {/* "Location Not Found" - Floating with time-based animation only */}
        <h2
          className="text-2xl font-bold text-white/80 absolute"
          style={{
            left: `${50 + Math.cos(time * 0.4) * 4}%`,
            top: `${50 + Math.sin(time * 0.3) * 3}%`,
            transform: `translate(-50%, -50%) 
                       translate3d(${Math.sin(time * 0.5) * 10}px, 
                                  ${Math.cos(time * 0.6) * 5}px, 
                                  ${30 + Math.sin(time * 0.9) * 10}px)
                       rotateZ(${Math.sin(time * 0.15) * 3}deg)`,
            transition: 'none',
            zIndex: 24
          }}
        >
          Location Not Found
        </h2>

        {/* Radar icon - Ultra smooth, elegant following motion */}
        <div
          className="text-purple absolute"
          style={{
            left: `${Math.round(cursorPosition.x * 100) / 100}px`,
            top: `${Math.round(cursorPosition.y * 100) / 100}px`,
            transform: `translate(-50%, -50%) 
                       translate3d(0, 0, ${Math.round((50 + Math.sin(time * 0.7) * 20) * 100) / 100}px) 
                       rotateZ(${Math.round(time * 20 * 100) / 100}deg)`,
            transition:
              'left 10s cubic-bezier(0.1, 0.1, 0.1, 0.1), top 10s cubic-bezier(0.1, 0.1, 0.1, 0.1)',
            zIndex: 23,
            pointerEvents: 'none'
          }}
        >
          <Radar
            size={80}
            style={{
              filter: `drop-shadow(0 0 15px rgba(139, 92, 246, 0.5))`
            }}
          />
        </div>

        {/* Main text - randomly positioned and time-based animation only */}
        <div
          className="text-gray-300 absolute"
          style={{
            left: `${50 + Math.sin(time * 0.3) * 3}%`,
            top: `${75 + Math.cos(time * 0.35) * 2}%`,
            width: '100%',
            maxWidth: '400px',
            transform: `translate(-50%, -50%) 
                       translate3d(${Math.sin(time * 0.4) * 5}px, 
                                  ${Math.cos(time * 0.45) * 5}px, 
                                  ${20 + Math.sin(time * 0.5) * 10}px)
                       rotateX(${Math.sin(time * 0.1) * 2}deg)
                       rotateY(${Math.cos(time * 0.15) * 2}deg)`,
            transition: 'none',
            zIndex: 22
          }}
        >
          <p className="text-sm text-gray-400 text-center">
            Our digital compass seems to be a bit confused.
          </p>
          <p className="mb-2 text-center">
            We've searched everywhere but couldn't locate the page you're
            looking for.
          </p>
        </div>

        {/* Dashboard button - floating with time-based animation only */}
        <div
          className="absolute"
          style={{
            left: `${50 + Math.sin(time * 0.25) * 6}%`,
            top: `${85 + Math.cos(time * 0.3) * 3}%`,
            transform: `translate(-50%, -50%) 
                       translate3d(${Math.sin(time * 0.6) * 8}px, 
                                  ${Math.cos(time * 0.5) * 5}px, 
                                  ${30 + Math.sin(time * 0.4) * 15}px)
                       rotateX(${Math.sin(time * 0.15) * 3}deg)
                       rotateY(${Math.cos(time * 0.2) * 3}deg)`,
            transition: 'none',
            transformStyle: 'preserve-3d',
            transformOrigin: 'center center',
            zIndex: 21
          }}
        >
          <Link href="/console/dashboards">
            <Button
              variant="outline"
              className="px-6 py-2 shadow bg-violet-900 hover:app-selected text-white border-0"
              style={{
                transform: `scale(${1 + Math.abs(mousePosition.x * mousePosition.y) * 0.05 + Math.sin(time * 0.5) * 0.05})`,
                boxShadow: `0 0 15px rgba(139, 92, 246, ${0.3 + Math.sin(time * 0.5) * 0.2})`,
                transition: 'none'
              }}
            >
              <Home className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Button>
          </Link>
        </div>

        {/* Back button - positioned in top left with animation */}
        <div
          className="absolute"
          style={{
            left: `${10 + Math.cos(time * 0.35) * 2}%`,
            top: `${10 + Math.sin(time * 0.4) * 1}%`,
            transform: `translate(0, 0) 
                       translate3d(${Math.cos(time * 0.7) * 5}px, 
                                  ${Math.sin(time * 0.6) * 3}px, 
                                  ${25 + Math.sin(time * 0.3) * 5}px)
                       rotateZ(${Math.sin(time * 0.2) * 2}deg)`,
            transition: 'none',
            transformStyle: 'preserve-3d',
            zIndex: 20
          }}
        >
          <button
            onClick={() => window.history.back()}
            className="text-purple hover:text-violet-600 flex items-center justify-center gap-1 cursor-pointer"
            style={{
              transform: `scale(${1 + Math.sin(time * 0.6) * 0.05})`,
              textShadow: `0 0 8px rgba(139, 92, 246, ${0.4 + Math.sin(time * 0.7) * 0.2})`,
              transition: 'none'
            }}
          >
            <ArrowLeft
              size={16}
              style={{
                transform: `translateX(${Math.sin(time * 0.8) * 3}px)`
              }}
            />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
