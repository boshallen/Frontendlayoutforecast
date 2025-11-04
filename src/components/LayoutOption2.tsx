import { useState } from 'react';
import { LoginRegister } from './LoginRegister';
import { LocationSelector } from './LocationSelector';
import { PredictionResults } from './PredictionResults';
import { AIReasoningChat } from './AIReasoningChat';
import { DashboardView } from './DashboardView';
import { HistoryView } from './HistoryView';
import { SettingsView } from './SettingsView';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable';
import { 
  BarChart3, 
  LogOut, 
  Home,
  Plus,
  Clock,
  Settings,
  Building2
} from 'lucide-react';

interface LayoutOption2Props {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

type NavigationView = 'dashboard' | 'prediction' | 'history' | 'settings';

export function LayoutOption2({ isLoggedIn, setIsLoggedIn }: LayoutOption2Props) {
  const [currentView, setCurrentView] = useState<NavigationView>('dashboard');
  const [hasSearched, setHasSearched] = useState(false);

  if (!isLoggedIn) {
    return <LoginRegister onLogin={() => setIsLoggedIn(true)} />;
  }

  const navigationItems = [
    { id: 'dashboard' as NavigationView, label: '工作台', icon: Home },
    { id: 'prediction' as NavigationView, label: '新建预测', icon: Plus },
    { id: 'history' as NavigationView, label: '历史记录', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header - SOE Style */}
      <header className="bg-gradient-to-r from-red-700 to-red-600 text-white shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
                <Building2 className="w-7 h-7 text-red-700" />
              </div>
              <div>
                <h1 className="text-xl text-white">房地产价格预测系统</h1>
                <p className="text-xs text-red-100">Real Estate Price Prediction System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <div className="text-red-100">欢迎您，</div>
                <div>演示用户</div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsLoggedIn(false)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                退出登录
              </Button>
            </div>
          </div>
        </div>
        
        {/* Navigation Bar */}
        <div className="bg-red-800 border-t border-red-600">
          <div className="px-6">
            <nav className="flex gap-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    className={`flex items-center gap-2 px-6 py-3 transition-colors relative ${
                      isActive 
                        ? 'bg-red-900 text-white' 
                        : 'text-red-100 hover:bg-red-700'
                    }`}
                    onClick={() => {
                      setCurrentView(item.id);
                      if (item.id !== 'prediction') {
                        setHasSearched(false);
                      }
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                    {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400" />}
                  </button>
                );
              })}
              <button
                className={`flex items-center gap-2 px-6 py-3 transition-colors relative ${
                  currentView === 'settings'
                    ? 'bg-red-900 text-white'
                    : 'text-red-100 hover:bg-red-700'
                }`}
                onClick={() => setCurrentView('settings')}
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm">系统设置</span>
                {currentView === 'settings' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400" />}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden bg-gray-100">
        {currentView === 'dashboard' && <DashboardView onNavigateToPrediction={() => setCurrentView('prediction')} />}
        {currentView === 'history' && <HistoryView />}
        {currentView === 'settings' && <SettingsView />}

        {/* Prediction View */}
        {currentView === 'prediction' && (
          <div className="flex-1 flex flex-col overflow-hidden h-full">
            {/* Location Selector at Top */}
            <div className="bg-white border-b shadow-sm">
              <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="mb-6">
                  <h2 className="text-xl mb-2 text-gray-900">房产价格智能预测</h2>
                  <p className="text-sm text-gray-600">
                    请选择房产位置信息，系统将为您提供基于机器学习的价格预测和专业分析
                  </p>
                </div>
                <LocationSelector onLocationChange={() => {}} />
                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={() => setHasSearched(true)} 
                    size="lg" 
                    className="px-10 bg-red-600 hover:bg-red-700"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    开始预测
                  </Button>
                </div>
              </div>
            </div>

            {/* Split Content Below */}
            <div className="flex-1 overflow-hidden">
              {hasSearched ? (
                <ResizablePanelGroup direction="horizontal" className="h-full">
                  <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="h-full overflow-auto bg-gray-50">
                      <div className="max-w-4xl mx-auto p-6">
                        <div className="mb-6 pb-4 border-b-2 border-red-600">
                          <h3 className="text-lg mb-1 text-gray-900">预测结果</h3>
                          <p className="text-sm text-gray-600">
                            基于机器学习模型的价格评估结果
                          </p>
                        </div>
                        <PredictionResults />
                      </div>
                    </div>
                  </ResizablePanel>

                  <ResizableHandle withHandle className="bg-gray-300" />

                  <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="h-full overflow-auto bg-white border-l-2 border-gray-200">
                      <div className="max-w-4xl mx-auto p-6">
                        <div className="mb-6 pb-4 border-b-2 border-blue-600">
                          <h3 className="text-lg mb-1 text-gray-900">智能分析</h3>
                          <p className="text-sm text-gray-600">
                            AI助手为您提供详细的市场分析和投资建议
                          </p>
                        </div>
                        <AIReasoningChat compact />
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-50">
                  <div className="text-center max-w-md px-4">
                    <div className="w-24 h-24 bg-red-100 border-4 border-red-600 rounded flex items-center justify-center mx-auto mb-6">
                      <BarChart3 className="w-12 h-12 text-red-600" />
                    </div>
                    <h3 className="text-xl mb-3 text-gray-900">准备就绪</h3>
                    <p className="text-gray-600">
                      请在上方选择房产位置信息，点击"开始预测"按钮，系统将为您生成智能分析报告
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 text-center text-sm text-gray-600">
        <div className="px-6">
          © 2025 房地产价格预测系统 版权所有 | 技术支持：人工智能研究中心
        </div>
      </footer>
    </div>
  );
}
