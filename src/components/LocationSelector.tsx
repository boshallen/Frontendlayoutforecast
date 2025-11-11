import { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';

// 省 -> 市 -> 区/县 -> 小区
type OptionsTree = Record<string, Record<string, Record<string, string[]>>>;

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
  // 选项数据
  const [options, setOptions] = useState<OptionsTree>({});

  // 选择值
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [area, setArea] = useState('');
  const [isNorthSouth, setIsNorthSouth] = useState(''); // 'yes' | 'no' | ''
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  // 从后端读取四级联动选项
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch('/location-options.json', { method: 'GET' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as OptionsTree;
        if (!alive) return;
        setOptions(json || {});
        // 若只有一个省/市可选，可以在此做默认选中（保持手动选择更安全，这里不自动勾选）
      } catch (e) {
        // 开发期提示即可；生产期可上报
        console.warn('[LocationSelector] 读取 location-options.json 失败：', e);
      }
    })();
    return () => { alive = false; };
  }, []);

  // 级联重置
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

  // 派发到父组件（与原 props 兼容）
  useEffect(() => {
    if (!onLocationChange) return;
    onLocationChange({
      province,
      city,
      district,
      neighborhood,
      area: area === '' ? NaN : Number(area),
      isNorthSouth,
      longitude: longitude === '' ? null : Number(longitude),
      latitude: latitude === '' ? null : Number(latitude),
    });
  }, [province, city, district, neighborhood, area, isNorthSouth, longitude, latitude, onLocationChange]);

  // 从 options 中派生当前级选项列表
  const provinces = Object.keys(options || {});
  const cities = province ? Object.keys(options[province] || {}) : [];
  const districts = province && city ? Object.keys(options[province]?.[city] || {}) : [];
  const neighborhoods = province && city && district ? (options[province]?.[city]?.[district] || []) : [];

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
              {provinces.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
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
              <SelectValue placeholder={province ? '请选择城市' : '请先选择省份'} />
            </SelectTrigger>
            <SelectContent>
              {cities.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="district" className="text-sm text-gray-900 flex items-center gap-1">
            <span className="text-red-600">*</span>
            区/县
          </Label>
          <Select value={district} onValueChange={handleDistrictChange} disabled={!city}>
            <SelectTrigger id="district" className="h-9 border-gray-300">
              <SelectValue placeholder={city ? '请选择区/县' : '请先选择城市'} />
            </SelectTrigger>
            <SelectContent>
              {districts.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="neighborhood" className="text-sm text-gray-900 flex items-center gap-1">
            <span className="text-red-600">*</span>
            小区名称
          </Label>
          <Select value={neighborhood} onValueChange={setNeighborhood} disabled={!district}>
            <SelectTrigger id="neighborhood" className="h-9 border-gray-300">
              <SelectValue placeholder={district ? '请选择小区' : '请先选择区/县'} />
            </SelectTrigger>
            <SelectContent>
              {neighborhoods.map((n) => (
                <SelectItem key={n} value={n}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          <Label htmlFor="isNorthSouth" className="text-sm text-gray-900">主要房间是否南北通透</Label>
          <Select value={isNorthSouth} onValueChange={setIsNorthSouth}>
            <SelectTrigger id="isNorthSouth" className="h-9 border-gray-300">
              <SelectValue placeholder="请选择" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">是</SelectItem>
              <SelectItem value="no">否</SelectItem>
            </SelectContent>
          </Select>
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
