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
type SearchMode = 'datasheet' | 'silkscreen' | 'brand' | 'alternative';

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
  },
  alternative: {
    label: '查替代',
    icon: Microchip,
    placeholder: '输入芯片型号查找替代品',
    description: '查找芯片的替代型号和兼容产品'
  }
};

// 芯片商家广告位数据 (3x4布局)
const chipVendors = [
  { name: 'STMicroelectronics', shortName: 'ST', logo: 'ST', color: 'bg-blue-600' },
  { name: 'Texas Instruments', shortName: 'TI', logo: 'TI', color: 'bg-red-600' },
  { name: 'Espressif', shortName: 'Espressif', logo: 'ESP', color: 'bg-green-600' },
  { name: 'Microchip', shortName: 'Microchip', logo: 'MCU', color: 'bg-orange-600' },
  { name: 'Analog Devices', shortName: 'ADI', logo: 'ADI', color: 'bg-purple-600' },
  { name: 'Infineon', shortName: 'Infineon', logo: 'IFX', color: 'bg-indigo-600' },
  { name: 'NXP', shortName: 'NXP', logo: 'NXP', color: 'bg-teal-600' },
  { name: 'Broadcom', shortName: 'Broadcom', logo: 'BCM', color: 'bg-pink-600' },
  { name: 'Qualcomm', shortName: 'Qualcomm', logo: 'QC', color: 'bg-cyan-600' },
  { name: 'Intel', shortName: 'Intel', logo: 'INTC', color: 'bg-gray-600' },
  { name: 'AMD', shortName: 'AMD', logo: 'AMD', color: 'bg-red-500' },
  { name: 'NVIDIA', shortName: 'NVIDIA', logo: 'NVDA', color: 'bg-green-500' },
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
        case 'alternative':
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

  const handleVendorClick = (vendor: any) => {
    console.log('点击商家:', vendor.name);
    // 这里可以跳转到商家页面或执行搜索
    handleSearch(vendor.name);
  };

  return (
    <div className="space-y-6 p-4 -mt-4">
      {/* Slogan */}
      <div className="text-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-1">
          芯片难题，魔力化解
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          专业的芯片查询与技术支持平台
        </p>
      </div>

      {/* 整体搜索功能卡片 */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-2xl border-2 border-orange-100/50 dark:border-orange-900/30 rounded-3xl overflow-hidden">
            <CardContent className="p-6 space-y-5">
              {/* 搜索框区域 */}
              <div className="space-y-3">
                <SearchBar
                  onSearch={handleSearch}
                  className="w-full"
                  placeholder={searchModes[searchMode].placeholder}
                  initialQuery={currentQuery}
                  aiEnhanced={aiEnhanced}
                  onAiToggle={handleAiToggle}
                  showAiTooltip={showAiTooltip}
                  onAiTooltipChange={setShowAiTooltip}
                />

                {/* 当前模式描述 */}
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {searchModes[searchMode].description}
                </p>
              </div>

              {/* 简洁分隔线 */}
              <div className="w-full border-t border-orange-200/30 dark:border-orange-800/20"></div>

              {/* 搜索模式切换器 - 突出按钮边框 */}
              <div className="flex items-center justify-center">
                <div className="inline-flex gap-3 p-1">
                  {Object.entries(searchModes).filter(([key]) => key !== 'datasheet').map(([key, mode]) => {
                    const IconComponent = mode.icon;
                    const isActive = searchMode === key;
                    return (
                      <button
                        key={key}
                        onClick={() => handleModeChange(key as SearchMode)}
                        className={`
                          inline-flex items-center gap-3 rounded-xl px-6 py-3.5 text-sm font-bold transition-all duration-300 transform relative overflow-hidden
                          ${isActive
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xl border-2 border-orange-400 ring-2 ring-orange-300/50 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 scale-105'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:scale-102 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-xl'
                          }
                        `}
                      >
                        <IconComponent className={`h-5 w-5 ${isActive ? 'drop-shadow-sm' : ''}`} />
                        <span className="relative z-10">{mode.label}</span>
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-amber-400/10 animate-pulse"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
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
            {searchMode === 'alternative' && currentQuery && (
              <div className="text-sm text-muted-foreground mb-3">
                <span className="font-medium">{currentQuery}</span> 的替代方案：
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
              {searchMode === 'alternative' && '未找到替代方案'}
            </AlertTitle>
            <AlertDescription>
              {searchMode === 'datasheet' && '没有芯片符合您的搜索条件。请尝试不同的关键词。'}
              {searchMode === 'silkscreen' && '未找到该丝印对应的型号。请检查丝印是否正确或尝试其他丝印。'}
              {searchMode === 'brand' && '未找到该品牌的产品信息。请检查品牌名称是否正确或尝试其他品牌。'}
              {searchMode === 'alternative' && '未找到该芯片的替代方案。请检查型号是否正确或尝试其他型号。'}
              {aiEnhanced && (
                <div className="mt-2 text-purple-600">
                  💡 AI建议：尝试使用更通用的关键词或检查拼写
                </div>
              )}
            </AlertDescription>
          </Alert>
        )
      ) : (
        // 默认内容：热门品牌广告位
        <div className="space-y-6">
          {/* 热门品牌广告位 - 温暖优雅设计 */}
          <Card className="shadow-xl bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 dark:from-gray-900 dark:via-orange-950/20 dark:to-amber-950/10 border-orange-100/50 dark:border-orange-900/30 backdrop-blur-sm">
            <CardHeader className="py-4 px-6 border-b border-orange-100/50 dark:border-orange-900/30">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-3 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent font-bold">
                  <Star className="h-6 w-6 text-orange-500" />
                  热门品牌
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all duration-300">
                  查看更多 <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-4 gap-3">
                {chipVendors.map((vendor, index) => (
                  <div
                    key={vendor.name}
                    onClick={() => handleVendorClick(vendor)}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-square flex flex-col items-center justify-center p-3 bg-gradient-to-br from-white via-orange-50/20 to-amber-50/10 dark:from-gray-800 dark:via-orange-950/10 dark:to-amber-950/5 rounded-2xl border border-orange-100/50 dark:border-orange-900/30 hover:border-orange-300/70 dark:hover:border-orange-600/50 transition-all duration-300 hover:shadow-xl group-hover:scale-110 hover:-translate-y-1 backdrop-blur-sm">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm mb-2 shadow-lg",
                        vendor.color
                      )}>
                        {vendor.logo}
                      </div>
                      <p className="text-xs text-center text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors font-semibold leading-tight">
                        {vendor.shortName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  点击品牌logo快速搜索相关产品
                </p>
                <div className="mt-2 w-16 h-0.5 bg-gradient-to-r from-orange-300 to-amber-300 rounded-full mx-auto opacity-60"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
