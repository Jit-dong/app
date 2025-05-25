"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SearchBar from "@/components/shared/search-bar";
import ChipListItem from "@/components/shared/chip-list-item";
import LoadingSpinner from "@/components/shared/loading-spinner";
import type { Chip } from "@/lib/types";
import { searchChips } from "@/lib/placeholder-data";
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
  Microchip,
  FileText,
  RefreshCw,
  Sparkles,
  HelpCircle,
  SearchX
} from 'lucide-react';
import { cn } from '@/lib/utils';

// 搜索模式类型定义
type SearchMode = 'datasheet' | 'silkscreen' | 'brand';

// 搜索模式配置
const searchModes = {
  datasheet: {
    label: '查资料',
    icon: FileText,
    placeholder: '搜索芯片型号、制造商、特性...',
    description: '查找芯片详细资料和规格参数'
  },
  silkscreen: {
    label: '丝印反查',
    icon: Zap,
    placeholder: '输入芯片丝印查询型号',
    description: '通过丝印标识查找对应的芯片型号'
  },
  brand: {
    label: '查品牌',
    icon: RefreshCw,
    placeholder: '输入品牌名称查看产品线',
    description: '查看品牌的产品系列和热门型号'
  }
};

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
  const [searchResults, setSearchResults] = useState<Chip[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [searchMode, setSearchMode] = useState<SearchMode>('datasheet');
  const [hasSearched, setHasSearched] = useState(false);
  const [aiEnhanced, setAiEnhanced] = useState(false);
  const [showAiTooltip, setShowAiTooltip] = useState(false);

  const performSearch = (query: string, mode: SearchMode = searchMode, useAI: boolean = aiEnhanced) => {
    setIsLoading(true);
    setHasSearched(true);

    // AI增强搜索需要更长时间
    const searchDelay = useAI ? 1500 : 500;

    setTimeout(() => {
      // 根据搜索模式调用不同的搜索逻辑
      let results: Chip[] = [];
      switch (mode) {
        case 'datasheet':
          results = searchChips(query);
          break;
        case 'silkscreen':
          results = searchChips(query);
          break;
        case 'brand':
          results = searchChips(query);
          break;
        default:
          results = searchChips(query);
      }

      if (useAI) {
        console.log('AI增强搜索已启用');
      }

      setSearchResults(results);
      setIsLoading(false);
    }, searchDelay);
  };

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
    setSearchQuery(query);
    performSearch(query, searchMode);
  };

  const handleModeChange = (mode: SearchMode) => {
    setSearchMode(mode);
    if (currentQuery.trim()) {
      performSearch(currentQuery, mode);
    }
  };

  const handleAiToggle = () => {
    const newAiState = !aiEnhanced;
    setAiEnhanced(newAiState);

    if (currentQuery.trim() && hasSearched) {
      performSearch(currentQuery, searchMode, newAiState);
    }
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

        {/* 搜索模式切换器 */}
        <div className="flex items-center justify-center">
          <div className="inline-flex rounded-xl bg-white dark:bg-gray-800 p-1 shadow-md border border-gray-200 dark:border-gray-700">
            {Object.entries(searchModes).map(([key, mode]) => {
              const IconComponent = mode.icon;
              const isActive = searchMode === key;
              return (
                <button
                  key={key}
                  onClick={() => handleModeChange(key as SearchMode)}
                  className={`
                    inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 当前模式描述 */}
        <div className="text-center">
          <p className="text-muted-foreground">
            {searchModes[searchMode].description}
          </p>
        </div>

        {/* 搜索框 */}
        <div className="flex justify-center">
          <SearchBar
            onSearch={handleSearch}
            className="w-full max-w-2xl"
            placeholder={searchModes[searchMode].placeholder}
            initialQuery={currentQuery}
            aiEnhanced={aiEnhanced}
            onAiToggle={handleAiToggle}
            showAiTooltip={showAiTooltip}
            onAiTooltipChange={setShowAiTooltip}
          />
        </div>
      </div>

      {/* 搜索结果或默认内容 */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner label={`正在${searchModes[searchMode].label}...`} />
        </div>
      ) : hasSearched ? (
        searchResults.length > 0 ? (
          <div className="space-y-4">
            {/* 根据搜索模式显示不同的结果标题 */}
            {searchMode === 'silkscreen' && currentQuery && (
              <div className="text-sm text-muted-foreground mb-3">
                丝印 <span className="font-medium">{currentQuery}</span> 可能对应的型号：
              </div>
            )}
            {searchMode === 'brand' && currentQuery && (
              <div className="text-sm text-muted-foreground mb-3">
                <span className="font-medium">{currentQuery}</span> 品牌产品：
              </div>
            )}

            {/* AI增强提示 */}
            {aiEnhanced && (
              <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-50 dark:bg-purple-950/20 p-2 rounded-lg mb-3">
                <Sparkles className="h-4 w-4" />
                <span>AI增强搜索已启用，结果已智能优化</span>
              </div>
            )}

            {searchResults.map((chip, index) => (
              <ChipListItem
                key={chip.id}
                chip={chip}
                showAlternativeCount={
                  searchMode === 'datasheet' &&
                  chip.model === 'TPS5430' &&
                  chip.id === 'TPS5430-1'
                }
              />
            ))}
          </div>
        ) : (
          <Alert variant="default" className="shadow-md">
            <SearchX className="h-5 w-5" />
            <AlertTitle>
              {searchMode === 'datasheet' && '未找到芯片'}
              {searchMode === 'silkscreen' && '未找到对应型号'}
              {searchMode === 'brand' && '未找到品牌产品'}
            </AlertTitle>
            <AlertDescription>
              {searchMode === 'datasheet' && '没有芯片符合您的搜索条件。请尝试不同的关键词。'}
              {searchMode === 'silkscreen' && '未找到该丝印对应的型号。请检查丝印是否正确或尝试其他丝印。'}
              {searchMode === 'brand' && '未找到该品牌的产品信息。请检查品牌名称是否正确或尝试其他品牌。'}
              {aiEnhanced && (
                <div className="mt-2 text-purple-600">
                  💡 AI建议：尝试使用更通用的关键词或检查拼写
                </div>
              )}
            </AlertDescription>
          </Alert>
        )
      ) : (
        // 默认内容：热门品牌和分类
        <div className="space-y-6">

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

      {/* 热门搜索 - 移到最后 */}
      <Card className="shadow-md">
        <CardHeader className="py-4 px-4 border-b">
          <CardTitle className="text-lg flex items-center gap-2">
            🔥 热门搜索
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
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
        </CardContent>
      </Card>
        </div>
      )}
    </div>
  );
}
