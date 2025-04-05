'use client';

import { useState, useMemo } from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import BackgroundComponent from '@/components/_common/layout/generated-bg';

// UI Components
import { Button } from '@/components/_common/ui/button';
import { Input } from '@/components/_common/ui/input';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle
} from '@/components/_common/ui/card';

// Local Components
import AutomationSheet from './sheet';
import { Page } from '@/components/_common/layout';

/**
 * Renders the Automation Creation Page component.
 *
 * This component provides a user interface for creating a new automation task.
 * It includes a form for user input, allowing users to specify the automation
 * task details. The page also integrates an AI assistant that guides users through
 * the process and offers real-time suggestions. The second step is displayed in a
 * slide-out sheet from the right.
 */

export default function AutomationCreatePage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeAutomation, setActiveAutomation] = useState({
    frequency: 'Real Time',
    source: 'LOC_PATIENT_REFERRALS',
    destination: 'REDUCE ATTRITION'
  });
  const [userPrompt, setUserPrompt] = useState('');
  
  // Create a stable seed value for the background component that won't change on re-renders
  const backgroundSeed = useMemo(() => Math.floor(Math.random() * 10000000), []);

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userPrompt.trim()) {
      setSheetOpen(true);
    }
  };

  return (
    <BackgroundComponent seed={backgroundSeed} distribution="edges">
      <div className="flex justify-center items-center min-h-screen w-full px-4 py-16">
        <Card className="max-w-3xl w-full bg-transparent p-8 border border-none shadow-none rounded-none">
          <Sparkles className="h-40 w-40 mx-auto text-purple-500 mb-6 font-thin" />

          <CardHeader className="p-0 mb-8 space-y-0">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="mr-2"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
              </Button>
              <CardTitle className="text-2xl font-bold">
                Create New Automation
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="p-0 space-y-8">
            <div className="space-y-4">
              <form
                onSubmit={handlePromptSubmit}
                className="flex flex-col space-y-4"
              >
                <fieldset className="border border-gray-200 rounded-md p-4 bg-white/70 shadow-sm">
                  <legend className="px-2 text-sm font-medium text-gray-700">
                    What do you want to know?
                  </legend>
                  <div className="relative mt-2">
                    <Input
                      id="userPrompt"
                      type="text"
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      placeholder="I would like to..."
                      className="pl-4 pr-20 py-6 text-base bg-white shadow-inner"
                    />
                    <Button
                      type="submit"
                      className="absolute right-2 inset-y-2 bg-purple-600 hover:bg-purple-700"
                    >
                      <span className="mr-1">Next</span>
                      <Sparkles className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </fieldset>
              </form>
            </div>

            <Card className="border border-gray-100 rounded-lg p-4 shadow-sm bg-white/70 backdrop-blur-sm">
              <CardHeader className="p-0 mb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-gray-600">
                      Required sources added
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-gray-600">
                      2 active archetypes
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-gray-600">
                      Data connections valid
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-gray-600">
                      Settings configured
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      {/* Sheet component for the second step */}
      <AutomationSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        userPrompt={userPrompt}
        activeAutomation={activeAutomation}
      />
    </BackgroundComponent>
  );
}
