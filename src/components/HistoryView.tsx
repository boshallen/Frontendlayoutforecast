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

  // Mock history data - 哈尔滨房产
  const historyData = [
    {
      id: 1,
      date: '2025-11-03',
      time: '14:32',
      location: '学府路小区',
      fullLocation: '黑龙江省哈尔滨市南岗区学府路小区',
      district: '南岗区',
      predictedPrice: 920000,
      confidence: 87,
      trend: 'up',
      priceChange: '+12%',
    },
    {
      id: 2,
      date: '2025-11-02',
      time: '16:45',
      location: '中央大街周边',
      fullLocation: '黑龙江省哈尔滨市道里区中央大街周边',
      district: '道里区',
      predictedPrice: 880000,
      confidence: 92,
      trend: 'up',
      priceChange: '+15%',
    },
    {
      id: 3,
      date: '2025-11-01',
      time: '10:15',
      location: '和兴路小区',
      fullLocation: '黑龙江省哈尔滨市香坊区和兴路小区',
      district: '香坊区',
      predictedPrice: 760000,
      confidence: 78,
      trend: 'up',
      priceChange: '+8%',
    },
    {
      id: 4,
      date: '2025-10-31',
      time: '09:20',
      location: '南直路住宅',
      fullLocation: '黑龙江省哈尔滨市道外区南直路住宅',
      district: '道外区',
      predictedPrice: 680000,
      confidence: 85,
      trend: 'up',
      priceChange: '+6%',
    },
    {
      id: 5,
      date: '2025-10-30',
      time: '11:50',
      location: '哈西万达',
      fullLocation: '黑龙江省哈尔滨市南岗区哈西万达',
      district: '南岗区',
      predictedPrice: 950000,
      confidence: 81,
      trend: 'up',
      priceChange: '+10%',
    },
    {
      id: 6,
      date: '2025-10-29',
      time: '15:30',
      location: '群力新区',
      fullLocation: '黑龙江省哈尔滨市道里区群力新区',
      district: '道里区',
      predictedPrice: 850000,
      confidence: 88,
      trend: 'up',
      priceChange: '+9%',
    },
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(historyData.length / itemsPerPage);
  
  const filteredData = historyData.filter((item) => {
    const matchesSearch = item.fullLocation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || item.district === filterBy;
    return matchesSearch && matchesFilter;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <h2 className="text-lg mb-1 text-gray-900">历史记录</h2>
          <p className="text-sm text-gray-600">
            查看和管理您的历史预测记录
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto p-6 space-y-5">
        {/* Search and Filters */}
        <Card className="p-4 border-2 border-gray-300 bg-white">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索预测记录..."
                className="pl-9 h-9 border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-[140px] h-9 border-gray-300">
                  <SelectValue placeholder="所有区县" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有区县</SelectItem>
                  <SelectItem value="南岗区">南岗区</SelectItem>
                  <SelectItem value="道里区">道里区</SelectItem>
                  <SelectItem value="香坊区">香坊区</SelectItem>
                  <SelectItem value="道外区">道外区</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[120px] h-9 border-gray-300">
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">最新优先</SelectItem>
                  <SelectItem value="date-asc">最早优先</SelectItem>
                  <SelectItem value="price-desc">价格(高)</SelectItem>
                  <SelectItem value="price-asc">价格(低)</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="h-9 border-gray-300">
                <Download className="w-4 h-4 mr-1.5" />
                导出
              </Button>
            </div>
          </div>
        </Card>

        {/* Predictions List */}
        <div className="grid gap-4">
          {paginatedData.map((item) => (
            <Card key={item.id} className="p-4 border-2 border-gray-300 hover:shadow-md transition-shadow bg-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base mb-0.5 text-gray-900">{item.location}</h3>
                      <p className="text-sm text-gray-600 mb-1.5">
                        哈尔滨市 {item.district}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.date} {item.time}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pl-13">
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">预测价格</div>
                      <div className="text-xl text-red-600">
                        ¥{(item.predictedPrice / 10000).toFixed(0)}万
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">置信度</div>
                      <div className="flex items-center gap-2">
                        <div className="text-base text-gray-900">{item.confidence}%</div>
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600"
                            style={{ width: `${item.confidence}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">市场趋势</div>
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
                  <Button variant="outline" size="sm" className="border-gray-300 h-8">
                    <Eye className="w-3 h-3 mr-1.5" />
                    查看
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    <FileText className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {filteredData.length > itemsPerPage && (
          <div className="flex items-center justify-between bg-white p-3 border-2 border-gray-300">
            <div className="text-xs text-gray-600">
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
                className="border-gray-300 h-8 text-xs"
              >
                <ChevronLeft className="w-3 h-3 mr-1" />
                上一页
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 p-0 text-xs ${currentPage === page ? 'bg-red-600 hover:bg-red-700' : ''}`}
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
                className="border-gray-300 h-8 text-xs"
              >
                下一页
                <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
