import { useState } from 'react';
import { LoginRegister } from './LoginRegister';
import { LocationSelector } from './LocationSelector';
import { PredictionResults } from './PredictionResults';
import { AIReasoningChat } from './AIReasoningChat';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { BarChart3, LogOut, User, MapPin, Search, MessageSquare, CheckCircle2 } from 'lucide-react';

interface LayoutOption3Props {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export function LayoutOption3({ isLoggedIn, setIsLoggedIn }: LayoutOption3Props) {
  const [currentStep, setCurrentStep] = useState(1);

  if (!isLoggedIn) {
    return <LoginRegister onLogin={() => setIsLoggedIn(true)} />;
  }

  const steps = [
    { number: 1, label: 'Select Location', icon: MapPin },
    { number: 2, label: 'View Prediction', icon: Search },
    { number: 3, label: 'AI Insights', icon: MessageSquare },
  ];

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2>Real Estate Predictor</h2>
              <p className="text-xs text-gray-500">Option 3: Wizard Flow</p>
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

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isComplete = currentStep > step.number;

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        isComplete
                          ? 'bg-green-500 border-green-500 text-white'
                          : isActive
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}
                    >
                      {isComplete ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <div className={`mt-2 text-sm text-center ${isActive ? '' : 'text-gray-500'}`}>
                      {step.label}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-1 bg-gray-200 mx-4 mb-6">
                      <div
                        className={`h-full transition-all ${
                          currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                        style={{ width: currentStep > step.number ? '100%' : '0%' }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="p-8 min-h-[500px]">
          {currentStep === 1 && (
            <div>
              <h3 className="mb-6">Step 1: Select Property Location</h3>
              <LocationSelector onLocationChange={() => {}} />
              <div className="mt-8 flex justify-end">
                <Button onClick={() => setCurrentStep(2)} className="px-8">
                  Continue to Prediction
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="mb-6">Step 2: Price Prediction Results</h3>
              <PredictionResults />
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back to Location
                </Button>
                <Button onClick={() => setCurrentStep(3)} className="px-8">
                  Continue to AI Insights
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="mb-6">Step 3: AI-Powered Insights & Recommendations</h3>
              <AIReasoningChat compact />
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  Back to Results
                </Button>
                <Button onClick={() => setCurrentStep(1)}>
                  Start New Prediction
                </Button>
              </div>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
