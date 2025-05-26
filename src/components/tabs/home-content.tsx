"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
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

// 芯片商家广告位数据 (3x4布局) - 使用实际图片
const chipVendors = [
  { name: 'STMicroelectronics', shortName: 'ST', image: '/brands/image.png' },
  { name: 'Texas Instruments', shortName: 'TI', image: '/brands/images.jpeg' },
  { name: 'Espressif', shortName: 'Espressif', image: '/brands/images.png' },
  { name: 'Microchip', shortName: 'Microchip', image: '/brands/images (1).jpeg' },
  { name: 'Analog Devices', shortName: 'ADI', image: '/brands/images (1).png' },
  { name: 'Infineon', shortName: 'Infineon', image: '/brands/images (2).png' },
  { name: 'NXP', shortName: 'NXP', image: '/brands/images (3).png' },
  { name: 'Broadcom', shortName: 'Broadcom', image: '/brands/images (4).png' },
  { name: 'Qualcomm', shortName: 'Qualcomm', image: '/brands/下载.jpeg' },
  { name: 'Intel', shortName: 'Intel', image: '/brands/下载.png' },
  { name: 'AMD', shortName: 'AMD', image: '/brands/下载 (1).jpeg' },
  { name: 'NVIDIA', shortName: 'NVIDIA', image: '/brands/下载 (1).png' },
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
          <Card className={`backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden relative transition-all duration-700 ${
            aiEnhanced
              ? 'bg-gradient-to-br from-white via-purple-50/40 to-indigo-50/30 dark:from-gray-900 dark:via-purple-950/30 dark:to-indigo-950/20 border border-purple-300/40 dark:border-purple-700/30'
              : 'bg-gradient-to-br from-white via-blue-50/30 to-slate-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-slate-950/10 border border-blue-200/30 dark:border-blue-800/20'
          }`}>
            {/* 动态装饰背景 */}
            {aiEnhanced ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/8 via-indigo-400/8 to-violet-400/8 animate-pulse"></div>
                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-400/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-indigo-400/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-violet-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse"></div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-slate-400/5 to-gray-400/5"></div>
                <div className="absolute top-0 left-0 w-36 h-36 bg-gradient-to-br from-blue-400/8 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-slate-400/8 to-transparent rounded-full blur-2xl"></div>
              </>
            )}

            <CardContent className="relative p-5 space-y-3">
              {/* 搜索框区域 */}
              <div className="space-y-2">
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
                <p className={`text-center text-xs font-medium transition-colors duration-500 ${
                  aiEnhanced
                    ? 'text-purple-600/90 dark:text-purple-400/90'
                    : 'text-blue-600/80 dark:text-blue-400/80'
                }`}>
                  {searchModes[searchMode].description}
                </p>
              </div>

              {/* 国际化风格搜索模式切换器 */}
              <div className="flex items-center justify-center">
                <div className={`inline-flex gap-1.5 p-1.5 rounded-2xl backdrop-blur-sm transition-all duration-500 ${
                  aiEnhanced
                    ? 'bg-gradient-to-r from-purple-100/60 via-indigo-100/60 to-violet-100/60 dark:from-purple-950/40 dark:via-indigo-950/40 dark:to-violet-950/40 border border-purple-200/40 dark:border-purple-700/30'
                    : 'bg-gradient-to-r from-blue-100/50 via-slate-100/50 to-gray-100/50 dark:from-blue-950/30 dark:via-slate-950/30 dark:to-gray-950/30 border border-blue-200/30 dark:border-blue-800/20'
                }`}>
                  {Object.entries(searchModes).filter(([key]) => key !== 'datasheet').map(([key, mode]) => {
                    const IconComponent = mode.icon;
                    const isActive = searchMode === key;
                    return (
                      <button
                        key={key}
                        onClick={() => handleModeChange(key as SearchMode)}
                        className={`
                          inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-500 transform relative overflow-hidden
                          ${isActive
                            ? aiEnhanced
                              ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-purple-500/30 scale-105 border border-purple-400/50'
                              : 'bg-gradient-to-r from-blue-600 via-blue-700 to-slate-700 text-white shadow-lg shadow-blue-500/25 scale-105 border border-blue-400/50'
                            : aiEnhanced
                              ? 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gradient-to-r hover:from-purple-50/80 hover:via-indigo-50/80 hover:to-violet-50/80 dark:hover:from-purple-950/50 dark:hover:via-indigo-950/50 dark:hover:to-violet-950/50 hover:scale-102 shadow-sm border border-transparent hover:border-purple-200/50'
                              : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-r hover:from-blue-50/80 hover:via-slate-50/80 hover:to-gray-50/80 dark:hover:from-blue-950/50 dark:hover:via-slate-950/50 dark:hover:to-gray-950/50 hover:scale-102 shadow-sm border border-transparent hover:border-blue-200/50'
                          }
                        `}
                      >
                        <IconComponent className={`h-4 w-4 ${isActive ? 'drop-shadow-sm' : ''}`} />
                        <span className="relative z-10">{mode.label}</span>
                        {isActive && (
                          <div className={`absolute inset-0 animate-pulse ${
                            aiEnhanced
                              ? 'bg-gradient-to-r from-purple-400/20 via-indigo-400/20 to-violet-400/20'
                              : 'bg-gradient-to-r from-blue-400/15 via-slate-400/15 to-gray-400/15'
                          }`}></div>
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
          {/* 热门品牌 - 国际化专业设计 */}
          <Card className="shadow-2xl bg-gradient-to-br from-white via-blue-50/20 to-slate-50/15 dark:from-gray-900 dark:via-blue-950/15 dark:to-slate-950/10 border border-blue-100/40 dark:border-blue-900/20 backdrop-blur-md rounded-3xl">
            <CardHeader className="py-5 px-6 border-b border-blue-100/40 dark:border-blue-900/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-3 bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent font-bold">
                  <Star className="h-6 w-6 text-blue-500" />
                  热门品牌
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-500 rounded-xl">
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
                    <div className="aspect-square flex flex-col items-center justify-center p-4 bg-gradient-to-br from-white via-blue-50/15 to-slate-50/10 dark:from-gray-800 dark:via-blue-950/10 dark:to-slate-950/5 rounded-3xl border border-blue-100/40 dark:border-blue-900/20 hover:border-blue-300/60 dark:hover:border-blue-600/40 transition-all duration-500 hover:shadow-2xl group-hover:scale-110 hover:-translate-y-2 backdrop-blur-sm">
                      <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-3 shadow-xl bg-white dark:bg-gray-700 overflow-hidden border border-gray-100/60 dark:border-gray-600/60 group-hover:shadow-2xl transition-all duration-500">
                        <Image
                          src={vendor.image}
                          alt={vendor.name}
                          width={96}
                          height={96}
                          className="w-22 h-22 object-contain rounded-2xl p-1.5 group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            // 如果图片加载失败，显示品牌名称缩写
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<span class="text-blue-600 font-bold text-lg">${vendor.shortName}</span>`;
                            }
                          }}
                        />
                      </div>
                      <p className="text-xs text-center text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500 font-semibold leading-tight">
                        {vendor.shortName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  点击品牌logo快速搜索相关产品
                </p>
                <div className="mt-3 w-20 h-0.5 bg-gradient-to-r from-blue-300 to-slate-400 rounded-full mx-auto opacity-60"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
