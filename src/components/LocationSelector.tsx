import { useState } from 'react';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';

// Mock data - replace with real data from your API
const locations = {
  provinces: ['北京市', '上海市', '广东省', '浙江省', '江苏省'],
  cities: {
    '北京市': ['北京市'],
    '上海市': ['上海市'],
    '广东省': ['广州市', '深圳市', '东莞市', '佛山市'],
    '浙江省': ['杭州市', '宁波市', '温州市'],
    '江苏省': ['南京市', '苏州市', '无锡市'],
  },
  districts: {
    '北京市': ['朝阳区', '海淀区', '东城区', '西城区'],
    '上海市': ['浦东新区', '黄浦区', '徐汇区', '长宁区'],
    '广州市': ['天河区', '越秀区', '海珠区', '番禺区'],
    '深圳市': ['南山区', '福田区', '罗湖区', '宝安区'],
    '杭州市': ['西湖区', '拱墅区', '江干区', '滨江区'],
    '南京市': ['鼓楼区', '玄武区', '秦淮区', '建邺区'],
    '苏州市': ['姑苏区', '吴中区', '相城区', '昆山市'],
  },
  neighborhoods: [
    '绿谷花园',
    '阳光广场',
    '湖景雅苑',
    '中央商务区',
    '科技园东区',
    '大学城',
    '滨江社区',
    '花园洋房',
    '地铁站周边',
    '工业园西区',
  ],
};

interface LocationSelectorProps {
  onLocationChange?: (location: {
    province: string;
    city: string;
    district: string;
    neighborhood: string;
  }) => void;
  compact?: boolean;
}

export function LocationSelector({ onLocationChange, compact = false }: LocationSelectorProps) {
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [open, setOpen] = useState(false);

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

  const handleNeighborhoodChange = (value: string) => {
    setNeighborhood(value);
    if (onLocationChange) {
      onLocationChange({ province, city, district, neighborhood: value });
    }
  };

  const gridClass = compact ? "grid gap-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4";

  return (
    <div className={gridClass}>
      <div className="space-y-2">
        <Label htmlFor="province" className="text-gray-900">省份</Label>
        <Select value={province} onValueChange={handleProvinceChange}>
          <SelectTrigger id="province" className="h-11 border-gray-300">
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
        <Label htmlFor="city" className="text-gray-900">城市</Label>
        <Select value={city} onValueChange={handleCityChange} disabled={!province}>
          <SelectTrigger id="city" className="h-11 border-gray-300">
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
        <Label htmlFor="district" className="text-gray-900">区/县</Label>
        <Select value={district} onValueChange={handleDistrictChange} disabled={!city}>
          <SelectTrigger id="district" className="h-11 border-gray-300">
            <SelectValue placeholder="请选择区县" />
          </SelectTrigger>
          <SelectContent>
            {city &&
              locations.districts[city as keyof typeof locations.districts]?.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-gray-900">小区名称</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between h-11 border-gray-300"
              disabled={!district}
            >
              {neighborhood || "搜索小区..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="搜索小区名称..." />
              <CommandList>
                <CommandEmpty>未找到相关小区</CommandEmpty>
                <CommandGroup>
                  {locations.neighborhoods.map((n) => (
                    <CommandItem
                      key={n}
                      value={n}
                      onSelect={(currentValue) => {
                        handleNeighborhoodChange(currentValue === neighborhood ? '' : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${neighborhood === n ? 'opacity-100' : 'opacity-0'}`}
                      />
                      {n}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
