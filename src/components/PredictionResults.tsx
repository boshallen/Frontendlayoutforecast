import { Card } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, DollarSign, Home, Calendar, BarChart3 } from 'lucide-react';

interface PredictionResultsProps {
  hasError?: boolean;
  isLoading?: boolean;
}

export function PredictionResults({ hasError = false, isLoading = false }: PredictionResultsProps) {
  // Mock data - replace with actual ML model results
  const predictionData = {
    estimatedPrice: 4580000,
    pricePerSqm: 58000,
    confidence: 87,
    trend: 'up',
    priceRange: {
      low: 4200000,
      high: 4960000,
    },
    comparables: [
      { address: '相似房产 1', price: 4500000, distance: '0.3 公里' },
      { address: '相似房产 2', price: 4650000, distance: '0.5 公里' },
      { address: '相似房产 3', price: 4480000, distance: '0.7 公里' },
    ],
    factors: [
      { name: '地段评分', value: 92, impact: 'high' },
      { name: '交通便利度', value: 85, impact: 'high' },
      { name: '学区质量', value: 78, impact: 'medium' },
      { name: '房龄因素', value: 65, impact: 'medium' },
      { name: '配套设施', value: 88, impact: 'medium' },
    ],
  };

  if (isLoading) {
    return (
      <Card className="p-6 border-gray-300">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </Card>
    );
  }

  if (hasError) {
    return (
      <Alert variant="destructive" className="border-red-300">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>预测失败</AlertTitle>
        <AlertDescription>
          无法生成预测结果，请检查您的位置选择后重试。如问题持续存在，可能是该区域数据不足。
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <Alert className="border-green-600 bg-green-50">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">预测完成</AlertTitle>
        <AlertDescription className="text-green-700">
          基于{predictionData.comparables.length}个可比房产，分析完成，置信度为{predictionData.confidence}%
        </AlertDescription>
      </Alert>

      <Card className="p-6 border-2 border-gray-300">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-gray-900">预测价格</h3>
              {predictionData.trend === 'up' ? (
                <Badge className="bg-red-100 text-red-800 border-red-300">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  上涨趋势
                </Badge>
              ) : (
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  下降趋势
                </Badge>
              )}
            </div>
            <div className="text-4xl text-red-600 mb-2">
              ¥{predictionData.estimatedPrice.toLocaleString()}
            </div>
            <div className="text-gray-600">
              单价 ¥{predictionData.pricePerSqm.toLocaleString()}/平方米
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">置信度</div>
            <div className="text-3xl text-blue-600">{predictionData.confidence}%</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">价格区间</span>
            <span className="text-gray-900">
              ¥{predictionData.priceRange.low.toLocaleString()} - ¥{predictionData.priceRange.high.toLocaleString()}
            </span>
          </div>
          <Progress value={predictionData.confidence} className="h-2 bg-gray-200" />
        </div>

        <div className="border-t-2 border-gray-200 pt-4">
          <h4 className="mb-4 text-gray-900">关键影响因素</h4>
          <div className="space-y-3">
            {predictionData.factors.map((factor, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{factor.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={
                        factor.impact === 'high' 
                          ? 'border-red-400 text-red-700 bg-red-50' 
                          : 'border-yellow-400 text-yellow-700 bg-yellow-50'
                      }
                    >
                      {factor.impact === 'high' ? '高影响' : '中影响'}
                    </Badge>
                    <span className="text-gray-900">{factor.value}/100</span>
                  </div>
                </div>
                <Progress value={factor.value} className="h-1.5 bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6 border-2 border-gray-300">
        <h4 className="mb-4 text-gray-900">可比房产</h4>
        <div className="space-y-3">
          {predictionData.comparables.map((comp, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-900">{comp.address}</div>
                  <div className="text-xs text-gray-500">距离 {comp.distance}</div>
                </div>
              </div>
              <div className="text-sm text-gray-900">¥{comp.price.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
