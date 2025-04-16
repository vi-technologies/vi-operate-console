'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/_common/ui/button';
import {
  Heart,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  BarChart3
} from 'lucide-react';
import { AnimatedBackground } from '@/components/_common/layout/animated-background';
import { Card, CardContent } from '@/components/_common/ui/card';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const viProducts = [
    {
      title: 'Vi Activate',
      description:
        'Uses the power of AI to identify, predict, and convert the highest value prospects at the lowest CPA',
      icon: <Users className="h-6 w-6" />,
      href: '/products/activate',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      title: 'Vi Engage',
      description:
        'Increases the lifetime value of a member by optimizing enrollment, engagement, and retention',
      icon: <TrendingUp className="h-6 w-6" />,
      href: '/products/engage',
      color: 'from-purple-500 to-violet-400'
    },
    {
      title: 'Vi Operate',
      description:
        'Leverages Generative AI to maximize operational efficiencies and financial returns',
      icon: <Zap className="h-6 w-6" />,
      href: '/products/operate',
      color: 'from-green-500 to-emerald-400'
    }
  ];

  const impactMetrics = [
    { value: '100M+', label: 'Members Served Daily' },
    { value: '35%', label: 'Increase in Program Utilization' },
    { value: '27%', label: 'Reduced Annual Attrition' },
    { value: '42%', label: 'Lower CPAs' },
    { value: '15%', label: 'Reduction in Operational Costs' }
  ];

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden overflow-y-auto">
      <AnimatedBackground />

      <div
        className={`relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-12 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="text-center mb-12 pt-16">
          <div className="flex justify-center mb-6">
            <img
              src="/assets/images/Logo.svg"
              alt="Vi Logo"
              className="w-24 h-24 animate-float"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-title">
            The Answer to What's Next for Health
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in">
            Helping people live healthy and active lives through AI-powered
            solutions
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in">
          {impactMetrics.map((metric, index) => (
            <div
              key={index}
              className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-3 text-center w-[160px] md:w-[180px]"
            >
              <div className="text-3xl font-bold text-white/80 mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-gray-400">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full mb-12 animate-fade-in-up">
          {viProducts.map((product, index) => (
            <Link href={product.href} key={index}>
              <Card className="h-full bg-black/40 border border-gray-800 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 group overflow-hidden">
                <CardContent className="p-6 text-center flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${product.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}
                  >
                    {product.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-400">{product.description}</p>
                  <div className="mt-4 text-sm text-primary flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Learn More</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="max-w-3xl text-center mb-12 animate-fade-in">
          <p className="text-gray-300 mb-6">
            VI works with the world's largest health organizations — from
            Fortune 500 health providers to pharma and consumer brands — helping
            them maximize acquisition, enrollment, engagement, retention, and
            health outcomes. Our powerful platform serves over 100 million
            members daily — and growing.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-gray-400">
              <Heart className="h-5 w-5 text-primary" />
              <span>Saving Lives</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Users className="h-5 w-5 text-primary" />
              <span>Maximizing Engagement</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Improving Outcomes</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Zap className="h-5 w-5 text-primary" />
              <span>Reducing Costs</span>
            </div>
          </div>
        </div>

        <div className="animate-fade-in flex gap-4">
          <Link href="/about">
            <Button
              variant="outline"
              className="px-6 py-6 text-lg border-primary text-primary hover:bg-primary/10"
            >
              Learn More
            </Button>
          </Link>
          <Link href="/console">
            <Button className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-white">
              Enter Console
              <BarChart3 className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
