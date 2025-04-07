'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/_common/ui/button';
import { 
  BarChart3, 
  Database, 
  Layers, 
  Zap, 
  ArrowRight 
} from 'lucide-react';
import { AnimatedBackground } from '@/components/_common/layout/animated-background';
import { Card, CardContent } from '@/components/_common/ui/card';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const platformFeatures = [
    {
      title: 'Data Sources',
      description: 'Connect and manage your data sources in one place',
      icon: <Database className="h-6 w-6" />,
      href: '/console/sources',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      title: 'Archetypes',
      description: 'Define data models and relationships',
      icon: <Layers className="h-6 w-6" />,
      href: '/console/archetypes',
      color: 'from-purple-500 to-violet-400'
    },
    {
      title: 'Dashboards',
      description: 'Visualize insights with AI-powered dashboards',
      icon: <BarChart3 className="h-6 w-6" />,
      href: '/console/dashboards',
      color: 'from-orange-500 to-amber-400'
    },
    {
      title: 'Automations',
      description: 'Create intelligent workflows and processes',
      icon: <Zap className="h-6 w-6" />,
      href: '/console/automations',
      color: 'from-green-500 to-emerald-400'
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      <AnimatedBackground />
      
      <div className={`relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-12 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-12 mt-[-80px]">
          <div className="flex justify-center mb-6">
            <img 
              src="/assets/images/Logo.svg" 
              alt="Logo" 
              className="w-24 h-24 animate-float"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-title">
            AI-Powered Data Platform
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in">
            Transform your data into actionable insights with our intelligent platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full mb-12 animate-fade-in-up">
          {platformFeatures.map((feature, index) => (
            <Link href={feature.href} key={index}>
              <Card className="h-full bg-black/40 border border-gray-800 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 group overflow-hidden">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                  <div className="mt-4 text-sm text-primary flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Explore</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="animate-fade-in">
          <Link href="/console/dashboards">
            <Button className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-white">
              Enter Console
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
