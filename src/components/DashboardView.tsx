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
  Plus,
  Calendar
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
      value: '¥420万',
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
      city: '深圳', 
      district: '南山区',
      growth: 18.2, 
      avgPrice: '¥540万',
      momentum: 'very-high'
    },
    { 
      city: '上海', 
      district: '浦东新区',
      growth: 15.7, 
      avgPrice: '¥620万',
      momentum: 'high'
    },
    { 
      city: '北京', 
      district: '朝阳区',
      growth: 12.3, 
      avgPrice: '¥460万',
      momentum: 'high'
    },
    { 
      city: '广州', 
      district: '天河区',
      growth: 8.4, 
      avgPrice: '¥380万',
      momentum: 'medium'
    },
  ];

  const recentActivity = [
    {
      action: '生成预测报告',
      location: '北京市朝阳区',
      time: '2 小时前',
      price: '¥458万',
    },
    {
      action: 'AI智能咨询',
      location: '上海市浦东新区',
      time: '5 小时前',
      price: '¥620万',
    },
    {
      action: '市场分析',
      location: '深圳市南山区',
      time: '1 天前',
      price: '¥540万',
    },
  ];

  return (
    <div className="flex-1 overflow-auto bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl mb-1 text-gray-900">工作台</h2>
              <p className="text-gray-600">
                {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
              </p>
            </div>
            <Button onClick={onNavigateToPrediction} size="lg" className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              新建预测
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 border-2 border-gray-300 hover:shadow-lg transition-shadow bg-white">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs px-2 py-1 border ${
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
                <div className="text-3xl mb-1 text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-900 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-600">{stat.description}</div>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Markets */}
          <Card className="p-6 border-2 border-gray-300 bg-white">
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-red-600">
              <div>
                <h3 className="mb-1 text-gray-900">热门市场</h3>
                <p className="text-sm text-gray-600">本季度增长最快的市场</p>
              </div>
            </div>
            <div className="space-y-4">
              {topMarkets.map((market, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-300 hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-900">{market.city}</span>
                      <span className="text-xs text-gray-500">· {market.district}</span>
                    </div>
                    <div className="text-sm text-gray-600">{market.avgPrice} 均价</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm mb-1 ${
                      market.momentum === 'very-high' ? 'text-red-600' : 
                      market.momentum === 'high' ? 'text-blue-600' : 
                      'text-gray-600'
                    }`}>
                      +{market.growth}%
                    </div>
                    <div className="flex items-center gap-1 justify-end">
                      <TrendingUp className="w-4 h-4 text-red-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 border-2 border-gray-300 bg-white">
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-blue-600">
              <div>
                <h3 className="mb-1 text-gray-900">最近动态</h3>
                <p className="text-sm text-gray-600">您的最新操作记录</p>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                查看全部
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                  <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center mt-1">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm mb-1 text-gray-900">{activity.action}</div>
                    <div className="text-xs text-gray-500">{activity.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-red-600 mb-1">{activity.price}</div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Market Insights Banner */}
        <Card className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white border-2 border-red-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="mb-2 text-white text-lg">市场分析报告</h3>
              <p className="text-red-100 mb-4">
                新的市场趋势和预测报告已准备就绪。获取一线城市房产估值的详细分析。
              </p>
              <Button variant="secondary" size="sm" className="bg-white text-red-600 hover:bg-red-50">
                查看报告
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <BarChart3 className="w-16 h-16 text-red-300 opacity-50" />
          </div>
        </Card>
      </div>
    </div>
  );
}
