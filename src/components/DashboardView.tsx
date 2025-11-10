import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Home, 
  BarChart3,
  Activity,
  ArrowRight,
  Plus
} from 'lucide-react';

interface DashboardViewProps {
  onNavigateToPrediction: () => void;
}

export function DashboardView({ onNavigateToPrediction }: DashboardViewProps) {
  const stats = [
    {
      label: '预测总数',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: BarChart3,
      description: '本月新增',
    },
    {
      label: '平均价格',
      value: '¥85万',
      change: '+8%',
      trend: 'up',
      icon: DollarSign,
      description: '所有预测',
    },
    {
      label: '关注房产',
      value: '18',
      change: '+3',
      trend: 'up',
      icon: Home,
      description: '正在跟踪',
    },
    {
      label: '平均置信度',
      value: '87%',
      change: '+2%',
      trend: 'up',
      icon: Activity,
      description: '模型准确度',
    },
  ];

  const topMarkets = [
    { 
      district: '南岗区',
      growth: 12.5, 
      avgPrice: '¥92万',
      properties: 156
    },
    { 
      district: '道里区',
      growth: 10.8, 
      avgPrice: '¥88万',
      properties: 134
    },
    { 
      district: '香坊区',
      growth: 9.2, 
      avgPrice: '¥76万',
      properties: 98
    },
    { 
      district: '道外区',
      growth: 7.6, 
      avgPrice: '¥68万',
      properties: 87
    },
  ];

  const recentActivity = [
    {
      action: '生成预测报告',
      location: '哈尔滨市南岗区',
      time: '2 小时前',
      price: '¥92万',
    },
    {
      action: 'AI智能咨询',
      location: '哈尔滨市道里区',
      time: '5 小时前',
      price: '¥88万',
    },
    {
      action: '市场分析',
      location: '哈尔滨市香坊区',
      time: '1 天前',
      price: '¥76万',
    },
  ];

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg mb-1 text-gray-900">工作台</h2>
              <p className="text-sm text-gray-600">
                {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
              </p>
            </div>
            <Button onClick={onNavigateToPrediction} className="bg-red-600 hover:bg-red-700 h-9">
              <Plus className="w-4 h-4 mr-1.5" />
              新建预测
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto p-6 space-y-5">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-4 border-2 border-gray-300 hover:shadow-md transition-shadow bg-white">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs px-2 py-0.5 border ${
                    stat.trend === 'up' ? 'bg-red-50 text-red-700 border-red-300' : 'bg-green-50 text-green-700 border-green-300'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl mb-0.5 text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-900 mb-0.5">{stat.label}</div>
                <div className="text-xs text-gray-600">{stat.description}</div>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* Top Markets */}
          <Card className="p-5 border-2 border-gray-300 bg-white">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-red-600">
              <div>
                <h3 className="text-base mb-1 text-gray-900">热门市场</h3>
                <p className="text-xs text-gray-600">哈尔滨市各区增长趋势</p>
              </div>
            </div>
            <div className="space-y-3">
              {topMarkets.map((market, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-300">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-gray-900">{market.district}</span>
                      <span className="text-xs text-gray-500">· {market.properties} 套房产</span>
                    </div>
                    <div className="text-xs text-gray-600">{market.avgPrice} 均价</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-red-600 mb-0.5">
                      +{market.growth}%
                    </div>
                    <div className="flex items-center gap-1 justify-end">
                      <TrendingUp className="w-3 h-3 text-red-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-5 border-2 border-gray-300 bg-white">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-blue-600">
              <div>
                <h3 className="text-base mb-1 text-gray-900">最近动态</h3>
                <p className="text-xs text-gray-600">您的最新操作记录</p>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 h-7 text-xs">
                查看全部
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mt-0.5">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm mb-0.5 text-gray-900">{activity.action}</div>
                    <div className="text-xs text-gray-500">{activity.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-red-600 mb-0.5">{activity.price}</div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Market Insights Banner */}
        <Card className="p-5 bg-gradient-to-r from-red-600 to-red-700 text-white border-2 border-red-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="mb-2 text-white text-base">哈尔滨市场分析报告</h3>
              <p className="text-red-100 text-sm mb-3">
                最新的市场趋势和预测报告已准备就绪。获取哈尔滨各区房产估值的详细分析。
              </p>
              <Button variant="secondary" size="sm" className="bg-white text-red-600 hover:bg-red-50 h-8 text-xs">
                查看报告
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <BarChart3 className="w-12 h-12 text-red-300 opacity-50" />
          </div>
        </Card>
      </div>
    </div>
  );
}
