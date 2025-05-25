"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Star,
  TrendingUp,
  ChevronRight,
  Zap,
  Cpu,
  Smartphone,
  Wifi,
  Battery,
  Microchip
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LiveAdBanner, ProductAdBanner, PromotionAdBanner } from '@/components/shared/home-ad-banner';

// 热门品牌数据
const hotBrands = [
  {
    name: 'STMicroelectronics',
    logo: '🔷',
    products: '1200+',
    hot: true,
    category: '微控制器',
    description: '全球领先的半导体解决方案供应商'
  },
  {
    name: 'Texas Instruments',
    logo: '🔶',
    products: '980+',
    hot: true,
    category: '模拟芯片',
    description: '模拟和嵌入式处理技术领导者'
  },
  {
    name: 'Espressif',
    logo: '🟢',
    products: '45+',
    hot: true,
    category: 'WiFi芯片',
    description: 'ESP32系列WiFi+蓝牙芯片专家'
  },
  {
    name: 'Microchip',
    logo: '🔴',
    products: '750+',
    hot: false,
    category: 'MCU',
    description: 'PIC和AVR微控制器制造商'
  },
  {
    name: 'Analog Devices',
    logo: '🟡',
    products: '650+',
    hot: false,
    category: '模拟器件',
    description: '高性能模拟、混合信号处理专家'
  },
  {
    name: 'Infineon',
    logo: '🟣',
    products: '420+',
    hot: false,
    category: '功率器件',
    description: '功率半导体和安全解决方案'
  },
];

// 热门产品分类
const hotCategories = [
  { name: '微控制器', icon: Cpu, count: '2800+', color: 'bg-blue-500' },
  { name: '传感器', icon: Zap, count: '1200+', color: 'bg-green-500' },
  { name: '通信芯片', icon: Wifi, count: '800+', color: 'bg-purple-500' },
  { name: '电源管理', icon: Battery, count: '950+', color: 'bg-orange-500' },
  { name: '处理器', icon: Microchip, count: '600+', color: 'bg-red-500' },
  { name: '移动芯片', icon: Smartphone, count: '400+', color: 'bg-indigo-500' },
];

// 热门搜索关键词
const hotSearchTerms = [
  'STM32F407', 'ESP32', 'TPS5430', 'LM358', 'AMS1117', 'ATmega328P',
  'NE555', 'LM2596', 'CH340', 'ESP8266', 'STM32F103', 'Arduino'
];

export default function HomeContent() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    console.log('搜索:', query);
    // 这里可以跳转到搜索页面或执行搜索逻辑
  };

  const handleBrandClick = (brand: any) => {
    console.log('点击品牌:', brand.name);
    // 这里可以跳转到品牌页面
  };

  const handleCategoryClick = (category: any) => {
    console.log('点击分类:', category.name);
    // 这里可以跳转到分类页面
  };

  return (
    <div className="space-y-6 p-4">
      {/* 顶部搜索区域 */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            芯片查询助手
          </h1>
          <p className="text-muted-foreground">
            快速查找芯片资料、替代品和技术参数
          </p>
        </div>

        {/* 搜索框 */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="搜索芯片型号、品牌或功能..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 text-base"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                handleSearch(searchQuery.trim());
              }
            }}
          />
          {searchQuery && (
            <Button
              onClick={() => handleSearch(searchQuery.trim())}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size="sm"
            >
              搜索
            </Button>
          )}
        </div>

        {/* 热门搜索 */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
            🔥 热门搜索
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {hotSearchTerms.map((term) => (
              <button
                key={term}
                onClick={() => handleSearch(term)}
                className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700 border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-200 hover:shadow-sm"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 热门品牌区域 */}
      <Card className="shadow-md">
        <CardHeader className="py-4 px-4 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              热门品牌
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              更多 <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {hotBrands.map((brand, index) => (
              <div
                key={brand.name}
                onClick={() => handleBrandClick(brand)}
                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl">{brand.logo}</div>
                    {brand.hot && (
                      <Badge variant="destructive" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        热门
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm leading-tight group-hover:text-accent transition-colors">
                      {brand.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">{brand.category}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {brand.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        {brand.products} 产品
                      </span>
                      <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 直播广告位 - 学习参考页面设计 */}
      <LiveAdBanner
        className="w-full"
        onClose={() => console.log('直播广告被关闭')}
      />

      {/* 产品分类区域 */}
      <Card className="shadow-md">
        <CardHeader className="py-4 px-4 border-b">
          <CardTitle className="text-lg flex items-center gap-2">
            <Cpu className="h-5 w-5 text-blue-500" />
            热门分类
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {hotCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.name}
                  onClick={() => handleCategoryClick(category)}
                  className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={cn("p-2 rounded-lg", category.color)}>
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm group-hover:text-accent transition-colors">
                        {category.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">{category.count}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 产品广告位 */}
      <ProductAdBanner
        className="w-full"
        onClose={() => console.log('产品广告被关闭')}
      />

      {/* 底部浮动促销广告 - 固定在页面底部 */}
      <div className="fixed bottom-20 left-4 right-4 z-40">
        <PromotionAdBanner
          onClose={() => console.log('促销广告被关闭')}
        />
      </div>
    </div>
  );
}
