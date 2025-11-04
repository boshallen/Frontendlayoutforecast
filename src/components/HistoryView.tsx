import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Search, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';

export function HistoryView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date-desc');

  // Mock history data
  const historyData = [
    {
      id: 1,
      date: '2025-11-03',
      time: '14:32',
      location: '绿谷花园',
      fullLocation: '北京市朝阳区绿谷花园',
      province: '北京市',
      city: '北京市',
      district: '朝阳区',
      predictedPrice: 4580000,
      confidence: 87,
      trend: 'up',
      priceChange: '+12%',
    },
    {
      id: 2,
      date: '2025-11-02',
      time: '16:45',
      location: '滨江社区',
      fullLocation: '上海市浦东新区滨江社区',
      province: '上海市',
      city: '上海市',
      district: '浦东新区',
      predictedPrice: 6200000,
      confidence: 92,
      trend: 'up',
      priceChange: '+15%',
    },
    {
      id: 3,
      date: '2025-11-01',
      time: '10:15',
      location: '科技园东区',
      fullLocation: '广州市天河区科技园东区',
      province: '广东省',
      city: '广州市',
      district: '天河区',
      predictedPrice: 3800000,
      confidence: 78,
      trend: 'down',
      priceChange: '-3%',
    },
    {
      id: 4,
      date: '2025-10-31',
      time: '09:20',
      location: '大学城',
      fullLocation: '深圳市南山区大学城',
      province: '广东省',
      city: '深圳市',
      district: '南山区',
      predictedPrice: 5400000,
      confidence: 85,
      trend: 'up',
      priceChange: '+8%',
    },
    {
      id: 5,
      date: '2025-10-30',
      time: '11:50',
      location: '湖景雅苑',
      fullLocation: '杭州市西湖区湖景雅苑',
      province: '浙江省',
      city: '杭州市',
      district: '西湖区',
      predictedPrice: 4100000,
      confidence: 81,
      trend: 'up',
      priceChange: '+6%',
    },
    {
      id: 6,
      date: '2025-10-29',
      time: '15:30',
      location: '中央商务区',
      fullLocation: '南京市鼓楼区中央商务区',
      province: '江苏省',
      city: '南京市',
      district: '鼓楼区',
      predictedPrice: 3950000,
      confidence: 88,
      trend: 'up',
      priceChange: '+10%',
    },
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(historyData.length / itemsPerPage);
  
  const filteredData = historyData.filter((item) => {
    const matchesSearch = item.fullLocation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || item.province === filterBy;
    return matchesSearch && matchesFilter;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex-1 overflow-auto bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h2 className="text-xl mb-1 text-gray-900">历史记录</h2>
          <p className="text-gray-600">
            查看和管理您的历史预测记录
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Search and Filters */}
        <Card className="p-4 border-2 border-gray-300 bg-white">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索预测记录..."
                className="pl-10 h-11 border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-[180px] h-11 border-gray-300">
                  <SelectValue placeholder="所有省份" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有省份</SelectItem>
                  <SelectItem value="北京市">北京市</SelectItem>
                  <SelectItem value="上海市">上海市</SelectItem>
                  <SelectItem value="广东省">广东省</SelectItem>
                  <SelectItem value="浙江省">浙江省</SelectItem>
                  <SelectItem value="江苏省">江苏省</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] h-11 border-gray-300">
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">最新优先</SelectItem>
                  <SelectItem value="date-asc">最早优先</SelectItem>
                  <SelectItem value="price-desc">价格(高)</SelectItem>
                  <SelectItem value="price-asc">价格(低)</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="h-11 border-gray-300">
                <Download className="w-4 h-4 mr-2" />
                导出
              </Button>
            </div>
          </div>
        </Card>

        {/* Predictions List */}
        <div className="grid gap-4">
          {paginatedData.map((item) => (
            <Card key={item.id} className="p-6 border-2 border-gray-300 hover:shadow-lg transition-shadow bg-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-red-600 rounded flex items-center justify-center">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-gray-900">{item.location}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.district}，{item.city}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {item.date} {item.time}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pl-[72px]">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">预测价格</div>
                      <div className="text-2xl text-red-600">
                        ¥{item.predictedPrice.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">置信度</div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg text-gray-900">{item.confidence}%</div>
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600"
                            style={{ width: `${item.confidence}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">市场趋势</div>
                      {item.trend === 'up' ? (
                        <Badge className="bg-red-100 text-red-800 border border-red-300">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {item.priceChange}
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800 border border-green-300">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          {item.priceChange}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gray-300">
                    <Eye className="w-4 h-4 mr-2" />
                    查看
                  </Button>
                  <Button variant="ghost" size="sm">
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {filteredData.length > itemsPerPage && (
          <div className="flex items-center justify-between bg-white p-4 border-2 border-gray-300">
            <div className="text-sm text-gray-600">
              显示 {((currentPage - 1) * itemsPerPage) + 1} 至{' '}
              {Math.min(currentPage * itemsPerPage, filteredData.length)} 条，共{' '}
              {filteredData.length} 条记录
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="border-gray-300"
              >
                <ChevronLeft className="w-4 h-4" />
                上一页
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 p-0 ${currentPage === page ? 'bg-red-600 hover:bg-red-700' : ''}`}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="border-gray-300"
              >
                下一页
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
