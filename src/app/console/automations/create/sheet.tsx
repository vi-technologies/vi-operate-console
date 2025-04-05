'use client';

import {
  Clock,
  Code,
  ExternalLink,
  ChevronRight,
  Database,
  XIcon
} from 'lucide-react';

// UI Components
import { Button } from '@/components/_common/ui/button';
import { Badge } from '@/components/_common/ui/badge';
import { Label } from '@/components/_common/ui/label';
import { 
  Card, 
  CardHeader, 
  CardContent,
  CardTitle 
} from '@/components/_common/ui/card';
import { 
  RadioGroup, 
  RadioGroupItem 
} from '@/components/_common/ui/radio-group';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from '@/components/_common/ui/sheet';

interface AutomationSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userPrompt: string;
  activeAutomation: {
    frequency: string;
    source: string;
    destination: string;
  };
}

export default function AutomationSheet({
  open,
  onOpenChange,
  userPrompt,
  activeAutomation
}: AutomationSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto p-0">
        <SheetHeader className="p-6 border-b sticky top-0 bg-white z-10">
          <SheetTitle className="text-lg font-bold flex items-center justify-between">
            <span>Configure Automation</span>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <XIcon className="h-4 w-4" />
              </Button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        
        <div className="py-6 px-6 space-y-8 overflow-y-auto">
          {/* Chat conversation section */}
          <div className="space-y-4">
            {/* User message */}
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%] shadow-sm">
                <p className="text-sm">
                  {userPrompt || 'I\'d like to start tracking patient referral events'}
                </p>
              </div>
            </div>

            {/* Assistant message with options */}
            <div className="flex justify-end">
              <div className="bg-purple-50 rounded-2xl rounded-tr-none px-5 py-4 max-w-[85%] shadow-sm border border-purple-100">
                <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-purple-100">
                  <div className="bg-purple-100 text-purple-800 font-medium px-2 py-1 rounded-full text-xs">
                    Vi Assistant
                  </div>
                  <span className="text-xs text-gray-500">Just now</span>
                </div>
                
                <div className="space-y-4">
                  <p className="text-sm">
                    I'll help you set up an automation to track patient referral
                    events. I've identified a suitable data source in your
                    connected systems.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 font-normal px-2 py-1">
                      <Database className="h-3 w-3 mr-1" />
                      {activeAutomation.source}
                    </Badge>
                  </div>

                  <div className="border-t border-b border-purple-100 py-4 my-2">
                    <p className="text-sm font-medium mb-3">
                      How frequently would you like to track these events?
                    </p>

                    <RadioGroup defaultValue="real-time" className="space-y-2">
                      <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-purple-200">
                        <RadioGroupItem value="real-time" id="sheet-real-time" className="text-purple-600" />
                        <Label htmlFor="sheet-real-time" className="text-sm">Real Time</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/60">
                        <RadioGroupItem value="weekly" id="sheet-weekly" />
                        <Label htmlFor="sheet-weekly" className="text-sm">Weekly</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/60">
                        <RadioGroupItem value="monthly" id="sheet-monthly" />
                        <Label htmlFor="sheet-monthly" className="text-sm">Monthly</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>

            {/* User response */}
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%] shadow-sm">
                <p className="text-sm">
                  Let's do real time
                </p>
              </div>
            </div>

            {/* Assistant confirmation */}
            <div className="flex justify-end">
              <div className="bg-purple-50 rounded-2xl rounded-tr-none px-5 py-4 max-w-[85%] shadow-sm border border-purple-100">
                <div className="space-y-4">
                  <p className="text-sm">
                    Perfect! I've configured the automation to run in real-time.
                    This will process events as they occur in the patient referral system.
                  </p>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <Code className="h-3.5 w-3.5 mr-1" />
                      Preview code
                    </Button>
                    
                    <div className="flex items-center text-xs text-blue-600 cursor-pointer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      <span>References</span>
                    </div>
                  </div>

                  <p className="text-sm mt-2">
                    Is there anything else I can help with for this automation?
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Preview section */}
          <Card className="border border-gray-200 rounded-lg shadow-sm bg-white/70 backdrop-blur-sm">
            <CardHeader className="py-3 px-5 border-b border-gray-100 bg-gray-50/70">
              <CardTitle className="text-sm font-medium flex items-center">
                <Clock className="h-4 w-4 text-purple-500 mr-2" />
                Automation Preview
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-gray-600">Frequency:</div>
                <div className="text-sm text-right">{activeAutomation.frequency}</div>
              
                <div className="text-sm font-medium text-gray-600">Source:</div>
                <div className="text-right">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 font-normal">
                    {activeAutomation.source}
                  </Badge>
                </div>
              
                <div className="text-sm font-medium text-gray-600">Destination:</div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 font-normal">
                    {activeAutomation.destination}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <SheetFooter className="border-t p-6 flex-col sm:flex-row sm:justify-between sm:gap-6 sticky bottom-0 bg-white z-10">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button className="w-full sm:w-auto flex justify-between items-center gap-2 bg-purple-600 hover:bg-purple-700">
            <span>Save and create automation</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}