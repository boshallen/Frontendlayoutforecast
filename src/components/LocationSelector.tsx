import { useState } from 'react';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

// 当前使用的数据 - 后期将从JSON文件读取
const locations = {
  provinces: ['黑龙江省'],
  cities: {
    '黑龙江省': ['哈尔滨市'],
  },
  districts: {
    '哈尔滨市': [], // 预留，后期从JSON读取
  },
  neighborhoods: [], // 预留，后期从JSON读取
};

interface LocationSelectorProps {
  onLocationChange?: (location: {
    province: string;
    city: string;
    district: string;
    neighborhood: string;
    area: number;
    isNorthSouth: string;
    longitude: number | null;
    latitude: number | null;
  }) => void;
  compact?: boolean;
}

export function LocationSelector({ onLocationChange, compact = false }: LocationSelectorProps) {
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [area, setArea] = useState('');
  const [isNorthSouth, setIsNorthSouth] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  const handleProvinceChange = (value: string) => {
    setProvince(value);
    setCity('');
    setDistrict('');
    setNeighborhood('');
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    setDistrict('');
    setNeighborhood('');
  };

  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setNeighborhood('');
  };

  return (
    <div className="space-y-5">
      {/* 第一行：省市区小区 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="province" className="text-sm text-gray-900 flex items-center gap-1">
            <span className="text-red-600">*</span>
            省份
          </Label>
          <Select value={province} onValueChange={handleProvinceChange}>
            <SelectTrigger id="province" className="h-9 border-gray-300">
              <SelectValue placeholder="请选择省份" />
            </SelectTrigger>
            <SelectContent>
              {locations.provinces.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm text-gray-900 flex items-center gap-1">
            <span className="text-red-600">*</span>
            城市
          </Label>
          <Select value={city} onValueChange={handleCityChange} disabled={!province}>
            <SelectTrigger id="city" className="h-9 border-gray-300">
              <SelectValue placeholder="请选择城市" />
            </SelectTrigger>
            <SelectContent>
              {province &&
                locations.cities[province as keyof typeof locations.cities]?.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="district" className="text-sm text-gray-900 flex items-center gap-1">
            <span className="text-red-600">*</span>
            区/县
          </Label>
          <Input
            id="district"
            placeholder="待从JSON加载"
            disabled
            className="h-9 border-gray-300 bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="neighborhood" className="text-sm text-gray-900 flex items-center gap-1">
            <span className="text-red-600">*</span>
            小区名称
          </Label>
          <Input
            id="neighborhood"
            placeholder="待从JSON加载"
            disabled
            className="h-9 border-gray-300 bg-gray-50"
          />
        </div>
      </div>

      {/* 第二行：面积、南北通透、经纬度 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="area" className="text-sm text-gray-900 flex items-center gap-1">
            <span className="text-red-600">*</span>
            面积（平方米）
          </Label>
          <Input
            id="area"
            type="number"
            placeholder="请输入房屋面积"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="h-9 border-gray-300"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-900">主要房间是否南北通透</Label>
          <RadioGroup value={isNorthSouth} onValueChange={setIsNorthSouth} className="flex items-center gap-4 h-9">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes" className="text-sm cursor-pointer">是</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no" className="text-sm cursor-pointer">否</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="longitude" className="text-sm text-gray-900">经度</Label>
          <Input
            id="longitude"
            type="number"
            step="0.000001"
            placeholder="选填"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="h-9 border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="latitude" className="text-sm text-gray-900">纬度</Label>
          <Input
            id="latitude"
            type="number"
            step="0.000001"
            placeholder="选填"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="h-9 border-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
