import { useState } from 'react';
import { LayoutOption1 } from './components/LayoutOption1';
import { LayoutOption2 } from './components/LayoutOption2';
import { LayoutOption3 } from './components/LayoutOption3';
import { LayoutOption4 } from './components/LayoutOption4';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';

export default function App() {
  const [selectedLayout, setSelectedLayout] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (selectedLayout === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="mb-4">Real Estate Price Prediction System</h1>
            <p className="text-gray-600">Choose your preferred layout option</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedLayout(1)}>
              <h3 className="mb-3">Option 1: Tabbed Interface</h3>
              <p className="text-gray-600 mb-4">Separate tabs for Prediction and AI Reasoning. Clean and organized with clear separation of concerns.</p>
              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Location selector at top</li>
                <li>• Tab switching between Prediction & AI Chat</li>
                <li>• Best for focused workflows</li>
              </ul>
              <Button className="w-full">Preview This Layout</Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedLayout(2)}>
              <h3 className="mb-3">Option 2: Split-Screen Layout</h3>
              <p className="text-gray-600 mb-4">Side-by-side view with prediction results on left and AI chat on right.</p>
              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Real-time comparison of prediction & reasoning</li>
                <li>• Resizable panels for flexibility</li>
                <li>• Best for desktop users</li>
              </ul>
              <Button className="w-full">Preview This Layout</Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedLayout(3)}>
              <h3 className="mb-3">Option 3: Wizard Flow</h3>
              <p className="text-gray-600 mb-4">Step-by-step guided process with progress indicator.</p>
              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Guided step-by-step experience</li>
                <li>• Progress tracking</li>
                <li>• Best for new users</li>
              </ul>
              <Button className="w-full">Preview This Layout</Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedLayout(4)}>
              <h3 className="mb-3">Option 4: Dashboard Style</h3>
              <p className="text-gray-600 mb-4">All-in-one dashboard with collapsible sections and sidebar navigation.</p>
              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>• Comprehensive overview</li>
                <li>• Sidebar navigation</li>
                <li>• Best for power users</li>
              </ul>
              <Button className="w-full">Preview This Layout</Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const layouts = {
    1: <LayoutOption1 isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
    2: <LayoutOption2 isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
    3: <LayoutOption3 isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
    4: <LayoutOption4 isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
  };

  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <Button variant="outline" onClick={() => setSelectedLayout(null)}>
          ← Back to Options
        </Button>
      </div>
      {layouts[selectedLayout as keyof typeof layouts]}
    </div>
  );
}
