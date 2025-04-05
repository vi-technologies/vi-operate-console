'use client';

import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Code,
  ExternalLink,
  ChevronRight,
  Database
} from 'lucide-react';
import { Button } from '@/components/_common/ui/button';
import { Input } from '@/components/_common/ui/input';
import { Badge } from '@/components/_common/ui/badge';
import { useState } from 'react';
import BackgroundComponent from '@/components/_common/layout/generated-bg';

/**
 * Renders the Automation Creation Page component.
 *
 * This component provides a user interface for creating a new automation task.
 * It includes a form for user input, allowing users to specify the automation
 * task details. The page also integrates an AI assistant that guides users through
 * the process and offers real-time suggestions. The layout is split into two sections:
 * a creation form on the left and an AI assistant section on the right, which is displayed
 * when the assistant is activated.
 */

export default function AutomationCreatePage() {
  const [showCreateAutomation, setShowCreateAutomation] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [activeAutomation, setActiveAutomation] = useState({
    frequency: 'Real Time',
    source: 'LOC_PATIENT_REFERRALS',
    destination: 'REDUCE ATTRITION'
  });
  const [userPrompt, setUserPrompt] = useState('');

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userPrompt.trim()) {
      setShowAiAssistant(true);
    }
  };

  const closeCreateAutomation = () => {
    setShowCreateAutomation(false);
    setShowAiAssistant(false);
    setUserPrompt('');
  };

  return (
    <BackgroundComponent>
      <div className="flex flex-col md:flex-row h-[80vh]">
        {/* Left side - Creation form */}
        <div className="flex-1 flex flex-col bg-gray-50 p-8 relative">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIyOSAwIDIuMjIyLjk5NiAyLjIyMiAyLjIyMiAwIDEuMjI5LS45OTYgMi4yMjItMi4yMjIgMi4yMjItMS4yMjYgMC0yLjIyMi0uOTk2LTIuMjIyLTIuMjIyIDAtMS4yMjYuOTk2LTIuMjIyIDIuMjIyLTIuMjIyek0yNCAxOGMxLjIyOSAwIDIuMjIyLjk5NiAyLjIyMiAyLjIyMiAwIDEuMjI5LS45OTYgMi4yMjItMi4yMjIgMi4yMjItMS4yMjYgMC0yLjIyMi0uOTk2LTIuMjIyLTIuMjIyIDAtMS4yMjYuOTk2LTIuMjIyIDIuMjIyLTIuMjIyek0yNCAzNmMxLjIyOSAwIDIuMjIyLjk5NiAyLjIyMiAyLjIyMiAwIDEuMjI5LS45OTYgMi4yMjItMi4yMjIgMi4yMjItMS4yMjYgMC0yLjIyMi0uOTk2LTIuMjIyLTIuMjIyIDAtMS4yMjYuOTk2LTIuMjIyIDIuMjIyLTIuMjIyek0zNiAzNmMxLjIyOSAwIDIuMjIyLjk5NiAyLjIyMiAyLjIyMiAwIDEuMjI5LS45OTYgMi4yMjItMi4yMjIgMi4yMjItMS4yMjYgMC0yLjIyMi0uOTk2LTIuMjIyLTIuMjIyIDAtMS4yMjYuOTk2LTIuMjIyIDIuMjIyLTIuMjIyeiIgZmlsbD0iI0UwRTBFMCIvPjwvZz48L3N2Zz4=')] opacity-10"></div>

          <Sparkles className="h-8 w-8 text-purple-500 mb-4 absolute top-6 right-24" />

          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={closeCreateAutomation}
              className="mr-2"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Button>
            <h1 className="text-2xl font-bold">Create New Automation</h1>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">What do you want to know?</h2>
              <form
                onSubmit={handlePromptSubmit}
                className="flex flex-col space-y-4"
              >
                <div className="relative">
                  <label className="font-medium mb-2 block">
                    I would like to...
                  </label>
                  <Input
                    type="text"
                    value={
                      userPrompt ||
                      (showAiAssistant
                        ? 'start tracking patient referral events'
                        : '')
                    }
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder="I would like to..."
                    className="pl-4 pr-12 py-6 text-base"
                  />
                  {!showAiAssistant && (
                    <Button
                      type="submit"
                      size="sm"
                      className="absolute right-2 top-1/2 mt-4 bg-purple-600 hover:bg-purple-700"
                    >
                      <span className="mr-1">Next</span>
                      <Sparkles className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </form>
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <span className="text-sm">
                  You have added the minimum amount of required sources.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <span className="text-sm">You have 2 running models.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - AI assistant */}
        {showAiAssistant && (
          <div className="flex-1 border-l border-gray-200 p-8 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Automation</h2>
              <Button>Save & Add</Button>
            </div>

            <div className="flex-1 overflow-auto mb-6 space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg max-w-[80%]">
                <p className="text-sm">
                  I'd like to start tracking patient referral events
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg ml-auto max-w-[80%]">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="bg-purple-100 text-purple-800 font-medium px-2 py-1 rounded text-xs">
                    Vi
                  </div>
                  <span className="text-xs text-gray-500">Just now</span>
                </div>
                <p className="text-sm mb-3">
                  I'll help you set up an automation to track patient referral
                  events. I've identified a suitable data source in your
                  connected systems.
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 font-normal px-2 py-1">
                    <Database className="h-3 w-3 mr-1" />
                    LOC_PATIENT_REFERRALS
                  </Badge>
                </div>

                <p className="text-sm mb-3">
                  How frequently would you like to track these events?
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 bg-white p-2 rounded border border-purple-300">
                    <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <span className="text-sm">Real Time</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded">
                    <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                    <span className="text-sm">Weekly</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded">
                    <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                    <span className="text-sm">Monthly</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-2 rounded-lg max-w-[80%] text-sm mb-4">
                  Let's do real time
                </div>

                <div className="flex items-center text-xs text-blue-600 mb-4">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  <span>View references and citations</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <Code className="h-3.5 w-3.5 mr-1" />
                  Preview code
                </Button>

                <p className="text-sm mt-4">
                  Is there anything else I can do to help you create this
                  automated task?
                </p>
              </div>
            </div>

            {/* Preview section */}
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-medium mb-3">Preview</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">Frequency:</span>
                  </div>
                  <span className="text-sm">Real time</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Source:</span>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 font-normal">
                    LOC_PATIENT_REFERRALS
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Sent to:</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 font-normal">
                    REDUCE ATTRITION
                  </Badge>
                </div>
              </div>
            </div>

            <Button className="w-full flex justify-between items-center">
              <span>No thanks just save and add it</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </BackgroundComponent>
  );
}
