import { useState } from 'react';
import { LoginRegister } from './LoginRegister';
import { LocationSelector } from './LocationSelector';
import { PredictionResults } from './PredictionResults';
import { AIReasoningChat } from './AIReasoningChat';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { 
  BarChart3, 
  LogOut, 
  User, 
  Home, 
  MapPin, 
  MessageSquare, 
  Settings,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  History
} from 'lucide-react';

interface LayoutOption4Props {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export function LayoutOption4({ isLoggedIn, setIsLoggedIn }: LayoutOption4Props) {
  const [hasSearched, setHasSearched] = useState(false);
  const [locationOpen, setLocationOpen] = useState(true);
  const [predictionOpen, setPredictionOpen] = useState(true);
  const [aiChatOpen, setAiChatOpen] = useState(true);

  if (!isLoggedIn) {
    return <LoginRegister onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm">Real Estate</h3>
              <p className="text-xs text-gray-500">Predictor</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
            <User className="w-4 h-4" />
            <span className="text-sm">Demo User</span>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Home className="w-4 h-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 bg-indigo-50 text-indigo-600">
              <MapPin className="w-4 h-4" />
              New Prediction
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <History className="w-4 h-4" />
              History
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </nav>

        <div className="p-4 border-t">
          <Button variant="outline" size="sm" className="w-full" onClick={() => setIsLoggedIn(false)}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b px-6 py-4">
          <h2>Property Price Prediction</h2>
          <p className="text-sm text-gray-500">Option 4: Dashboard with Sidebar</p>
        </header>

        <div className="p-6 space-y-4">
          {/* Location Section */}
          <Collapsible open={locationOpen} onOpenChange={setLocationOpen}>
            <Card>
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="text-left">
                    <h3>Location Selection</h3>
                    <p className="text-sm text-gray-500">Choose property location for analysis</p>
                  </div>
                </div>
                {locationOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-0 border-t">
                  <LocationSelector onLocationChange={() => {}} />
                  <div className="mt-4 flex justify-end">
                    <Button onClick={() => setHasSearched(true)} className="px-8">
                      Generate Prediction
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Prediction Results Section */}
          {hasSearched && (
            <Collapsible open={predictionOpen} onOpenChange={setPredictionOpen}>
              <Card>
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <h3>Prediction Results</h3>
                      <p className="text-sm text-gray-500">ML-powered price estimation</p>
                    </div>
                  </div>
                  {predictionOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 pt-0 border-t">
                    <PredictionResults />
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          )}

          {/* AI Reasoning Section */}
          {hasSearched && (
            <Collapsible open={aiChatOpen} onOpenChange={setAiChatOpen}>
              <Card>
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <h3>AI Reasoning & Insights</h3>
                      <p className="text-sm text-gray-500">Chat with AI for detailed analysis</p>
                    </div>
                  </div>
                  {aiChatOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 pt-0 border-t">
                    <AIReasoningChat compact />
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          )}

          {!hasSearched && (
            <Card className="p-12 text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="mb-2">Ready to Start</h3>
              <p className="text-gray-600">Select a location above to generate your first prediction.</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
