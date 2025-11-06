import { useState } from 'react';
import { LoginRegister } from './LoginRegister';
import { LocationSelector } from './LocationSelector';
import { PredictionResults } from './PredictionResults';
import { AIReasoningChat } from './AIReasoningChat';
import { DashboardView } from './DashboardView';
import { HistoryView } from './HistoryView';
import { SettingsView } from './SettingsView';
import { Button } from './ui/button';
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - SOE Style */}
      <header className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white shadow-xl">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between max-w-[1600px] mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-md flex items-center justify-center shadow-lg">
                <Building2 className="w-8 h-8 text-red-700" />
              </div>
              <div>
                <h1 className="text-2xl text-white tracking-wide">房地产价格预测系统</h1>
                <p className="text-xs text-red-100 mt-0.5">Real Estate Price Prediction System</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-sm bg-red-800/30 px-4 py-2 rounded">
                <div className="text-red-100 text-xs">欢迎您，</div>
                <div className="mt-0.5">演示用户</div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsLoggedIn(false)}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all"
              >
                <LogOut className="w-4 h-4 mr-2" />
                退出登录
              </Button>
            </div>
          </div>
        </div>
        
        {/* Navigation Bar */}
        <div className="bg-red-800/80 border-t border-red-600/50">
          <div className="px-8 max-w-[1600px] mx-auto">
            <nav className="flex gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    className={`flex items-center gap-2.5 px-8 py-3.5 transition-all relative ${
                      isActive 
                        ? 'bg-red-900/60 text-white shadow-inner' 
                        : 'text-red-100 hover:bg-red-700/50 hover:text-white'
                    }`}
                    onClick={() => {
                      setCurrentView(item.id);
                      if (item.id !== 'prediction') {
                        setHasSearched(false);
                      }
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                    {isActive && <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 shadow-lg" />}
                  </button>
                );
              })}
              <button
                className={`flex items-center gap-2.5 px-8 py-3.5 transition-all relative ${
                  currentView === 'settings'
                    ? 'bg-red-900/60 text-white shadow-inner'
                    : 'text-red-100 hover:bg-red-700/50 hover:text-white'
                }`}
                onClick={() => setCurrentView('settings')}
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">系统设置</span>
                {currentView === 'settings' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 shadow-lg" />}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden bg-gray-50">
        {currentView === 'dashboard' && <DashboardView onNavigateToPrediction={() => setCurrentView('prediction')} />}
        {currentView === 'history' && <HistoryView />}
        {currentView === 'settings' && <SettingsView />}

        {/* Prediction View */}
        {currentView === 'prediction' && (
          <div className="flex-1 flex flex-col overflow-hidden h-full">
            {/* Location Selector at Top */}
            <div className="bg-white border-b shadow-sm">
              <div className="max-w-[1600px] mx-auto px-8 py-8">
                <div className="mb-8">
                  <h2 className="text-2xl mb-2 text-gray-900">房产价格智能预测</h2>
                  <p className="text-sm text-gray-600">
                    请选择房产位置信息，系统将为您提供基于机器学习的价格预测和专业分析
                  </p>
                </div>
                <LocationSelector onLocationChange={() => {}} />
                <div className="mt-8 flex justify-end">
                  <Button 
                    onClick={() => setHasSearched(true)} 
                    size="lg" 
                    className="px-12 h-12 bg-red-600 hover:bg-red-700 shadow-lg text-base"
                  >
                    <BarChart3 className="w-5 h-5 mr-2" />
                    开始预测
                  </Button>
                </div>
              </div>
            </div>

            {/* Split Content Below */}
            <div className="flex-1 overflow-hidden">
              {hasSearched ? (
                <ResizablePanelGroup direction="horizontal" className="h-full">
                  <ResizablePanel defaultSize={50} minSize={35}>
                    <div className="h-full overflow-auto bg-gray-50">
                      <div className="max-w-4xl mx-auto p-8">
                        <div className="mb-8 pb-5 border-b-4 border-red-600">
                          <h3 className="text-xl mb-2 text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
                              <BarChart3 className="w-5 h-5 text-white" />
                            </div>
                            预测结果
                          </h3>
                          <p className="text-sm text-gray-600 pl-13">
                            基于机器学习模型的价格评估结果
                          </p>
                        </div>
                        <PredictionResults />
                      </div>
                    </div>
                  </ResizablePanel>

                  <ResizableHandle withHandle className="bg-gray-300 hover:bg-red-400 transition-colors w-1.5" />

                  <ResizablePanel defaultSize={50} minSize={35}>
                    <div className="h-full overflow-auto bg-white border-l-4 border-blue-500">
                      <div className="max-w-4xl mx-auto p-8">
                        <div className="mb-8 pb-5 border-b-4 border-blue-600">
                          <h3 className="text-xl mb-2 text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
                              <BarChart3 className="w-5 h-5 text-white" />
                            </div>
                            智能分析
                          </h3>
                          <p className="text-sm text-gray-600 pl-13">
                            AI助手为您提供详细的市场分析和投资建议
                          </p>
                        </div>
                        <AIReasoningChat compact />
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              ) : (
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="text-center max-w-lg px-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-50 border-4 border-red-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                      <BarChart3 className="w-16 h-16 text-red-600" />
                    </div>
                    <h3 className="text-2xl mb-4 text-gray-900">准备就绪</h3>
                    <p className="text-gray-600 leading-relaxed">
                      请在上方选择房产位置信息，点击"开始预测"按钮，<br />系统将为您生成智能分析报告
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t shadow-inner py-4 text-center text-sm text-gray-600">
        <div className="px-8 max-w-[1600px] mx-auto">
          <p>© 2025 房地产价格预测系统 版权所有 | 技术支持：人工智能研究中心 | 备案号：京ICP备XXXXXXXX号</p>
        </div>
      </footer>
    </div>
  );
}
