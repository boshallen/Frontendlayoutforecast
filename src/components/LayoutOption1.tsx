import { useState } from 'react';
import { LoginRegister } from './LoginRegister';
import { LocationSelector } from './LocationSelector';
import { PredictionResults } from './PredictionResults';
import { AIReasoningChat } from './AIReasoningChat';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { BarChart3, MessageSquare, LogOut, User } from 'lucide-react';

interface LayoutOption1Props {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export function LayoutOption1({ isLoggedIn, setIsLoggedIn }: LayoutOption1Props) {
  const [hasSearched, setHasSearched] = useState(false);

  if (!isLoggedIn) {
    return <LoginRegister onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2>Real Estate Predictor</h2>
              <p className="text-xs text-gray-500">Option 1: Tabbed Interface</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <User className="w-4 h-4" />
              <span className="text-sm">Demo User</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsLoggedIn(false)}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Location Selector */}
        <Card className="p-6 mb-6">
          <h3 className="mb-4">Select Location</h3>
          <LocationSelector onLocationChange={() => {}} />
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setHasSearched(true)} className="px-8">
              Generate Prediction
            </Button>
          </div>
        </Card>

        {/* Tabbed Content */}
        {hasSearched && (
          <Tabs defaultValue="prediction" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="prediction" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Prediction Results
              </TabsTrigger>
              <TabsTrigger value="reasoning" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                AI Reasoning
              </TabsTrigger>
            </TabsList>

            <TabsContent value="prediction" className="mt-6">
              <PredictionResults />
            </TabsContent>

            <TabsContent value="reasoning" className="mt-6">
              <AIReasoningChat />
            </TabsContent>
          </Tabs>
        )}

        {!hasSearched && (
          <Card className="p-12 text-center">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="mb-2">Ready to Predict</h3>
            <p className="text-gray-600">Select a location above and click "Generate Prediction" to get started.</p>
          </Card>
        )}
      </main>
    </div>
  );
}
