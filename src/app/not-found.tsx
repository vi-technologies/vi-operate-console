'use client';

import Link from 'next/link';
import { Button } from '@/components/_common/ui/button';
import { 
  Radar,
  Search,
  Map,
  Compass,
  Home,
  ArrowLeft
} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{ 
              width: `${Math.random() * 300 + 50}px`, 
              height: `${Math.random() * 300 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5
            }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        <div className="mb-6 text-green-400">
          <Radar size={80} />
        </div>
        
        <h1 className="text-8xl font-extrabold text-white mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white/80 mb-6">Location Not Found</h2>
        
        <div className="max-w-lg text-gray-300 mb-8">
          <p className="mb-4">We've searched everywhere but couldn't locate the page you're looking for.</p>
          <div className="flex items-center justify-center gap-3 mb-2 text-green-400">
            <Search size={20} />
            <Map size={20} />
            <Compass size={20} />
          </div>
          <p className="text-sm text-gray-400">Our digital compass seems to be a bit confused.</p>
        </div>
        
        <div>
          <Link href="/console/dashboards">
            <Button variant="outline" className="px-6 py-2 rounded-full shadow bg-green-500 hover:bg-green-600 text-black border-0">
              <Home className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Button>
          </Link>
        </div>
        
        <div className="mt-4">
          <button 
            onClick={() => window.history.back()}
            className="text-green-400 hover:text-green-300 flex items-center justify-center gap-1"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}