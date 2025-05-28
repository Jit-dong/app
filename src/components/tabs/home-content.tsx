"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import EnhancedSearchBar from "@/components/shared/enhanced-search-bar";
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
  Shuffle,
  HelpCircle,
  SearchX
} from 'lucide-react';
import { cn } from '@/lib/utils';

// 搜索模式类型定义
type SearchMode = 'datasheet' | 'silkscreen' | 'cross' | 'alternative';

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
    icon: SearchX,
    placeholder: '输入芯片丝印查询型号',
    description: '通过丝印标识查找对应的芯片型号'
  },
  alternative: {
    label: '查替代',
    icon: RefreshCw,
    placeholder: '输入芯片型号查找替代品',
    description: '查找芯片的替代型号和兼容产品'
  },
  cross: {
    label: '交叉查询',
    icon: Shuffle,
    placeholder: '多维度交叉查询芯片信息',
    description: '通过多种条件组合查询芯片'
  }
};

// 芯片商家广告位数据 (3x4布局) - 使用现有的图片文件
const chipVendors = [
  { name: 'STMicroelectronics', shortName: 'ST', image: '/brands/ST.png' },
  { name: 'Texas Instruments', shortName: 'TI', image: '/brands/TI.png' },
  { name: 'Microchip', shortName: 'Microchip', image: '/brands/MICROCHIP.png' },
  { name: 'Infineon', shortName: 'Infineon', image: '/brands/ Infineon.png' },
  { name: 'NXP', shortName: 'NXP', image: '/brands/NXP.png' },
  { name: 'Maxim', shortName: 'MAX', image: '/brands/MAX.png' },
  { name: 'Vishay', shortName: 'VISHAY', image: '/brands/VISHAY.png' },
  { name: 'Intersil', shortName: 'Intersil', image: '/brands/Intersil.png' },
  { name: 'Fujitsu', shortName: 'Fujitsu', image: '/brands/ Fujitsu.png' },
  { name: 'Toshiba', shortName: 'Toshiba', image: '/brands/Toshiba.png' },
  { name: 'JRC', shortName: 'JRC', image: '/brands/JRC.png' },
  { name: 'NTE', shortName: 'NTE', image: '/brands/NTE.png' },
];



export default function HomeContent() {
  const router = useRouter();
  const [searchMode, setSearchMode] = useState<SearchMode>('datasheet');

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // 跳转到搜索结果页面
      const params = new URLSearchParams();
      params.set('q', query);
      params.set('mode', searchMode);
      router.push(`/search?${params.toString()}`);
    }
  };

  const handleModeChange = (mode: SearchMode) => {
    setSearchMode(mode);
  };

  const handleVendorClick = (vendor: any) => {
    console.log('点击商家:', vendor.name);
    // 跳转到交叉查询页面
    const params = new URLSearchParams();
    params.set('q', vendor.name);
    params.set('mode', 'cross');
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="space-y-6 p-4 -mt-4">
      {/* Slogan */}
      <div className="text-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-1">
          发现新芯世界
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          专业的芯片查询与技术支持平台
        </p>
      </div>

      {/* 整体搜索功能卡片 */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <Card className="backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden relative transition-all duration-700 bg-gradient-to-br from-white via-blue-50/30 to-slate-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-slate-950/10 border border-blue-200/30 dark:border-blue-800/20">
            {/* 装饰背景 */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-slate-400/5 to-gray-400/5"></div>
            <div className="absolute top-0 left-0 w-36 h-36 bg-gradient-to-br from-blue-400/8 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-slate-400/8 to-transparent rounded-full blur-2xl"></div>

            <CardContent className="relative p-5 space-y-3">
              {/* 搜索框区域 */}
              <div className="space-y-2">
                <EnhancedSearchBar
                  onSearch={handleSearch}
                  className="w-full"
                  placeholder={searchModes[searchMode].placeholder}
                  showSuggestions={true}
                />


              </div>

              {/* 彩色搜索模式切换器 */}
              <div className="flex items-center justify-center">
                <div className="inline-flex gap-4 p-2">
                  {Object.entries(searchModes).filter(([key]) => key !== 'datasheet').map(([key, mode]) => {
                    const IconComponent = mode.icon;
                    const isActive = searchMode === key;

                    // 为每个按钮定义独特的颜色
                    const buttonColors = {
                      precise: {
                        active: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30',
                        inactive: 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 text-blue-600 dark:text-blue-400 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900/70 dark:hover:to-blue-800/70 border border-blue-200/50 dark:border-blue-800/30'
                      },
                      silkscreen: {
                        active: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30',
                        inactive: 'bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-950/50 dark:to-emerald-900/50 text-green-600 dark:text-green-400 hover:from-green-100 hover:to-emerald-200 dark:hover:from-green-900/70 dark:hover:to-emerald-800/70 border border-green-200/50 dark:border-green-800/30'
                      },
                      alternative: {
                        active: 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30',
                        inactive: 'bg-gradient-to-r from-orange-50 to-red-100 dark:from-orange-950/50 dark:to-red-900/50 text-orange-600 dark:text-orange-400 hover:from-orange-100 hover:to-red-200 dark:hover:from-orange-900/70 dark:hover:to-red-800/70 border border-orange-200/50 dark:border-orange-800/30'
                      },
                      cross: {
                        active: 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/30',
                        inactive: 'bg-gradient-to-r from-purple-50 to-violet-100 dark:from-purple-950/50 dark:to-violet-900/50 text-purple-600 dark:text-purple-400 hover:from-purple-100 hover:to-violet-200 dark:hover:from-purple-900/70 dark:hover:to-violet-800/70 border border-purple-200/50 dark:border-purple-800/30'
                      }
                    };

                    const colorScheme = buttonColors[key as keyof typeof buttonColors] || buttonColors.precise;

                    return (
                      <button
                        key={key}
                        onClick={() => {
                          handleModeChange(key as SearchMode);
                          // 跳转到对应的搜索页面
                          const params = new URLSearchParams();
                          params.set('mode', key);
                          router.push(`/search?${params.toString()}`);
                        }}
                        className={`
                          inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-500 transform relative overflow-hidden
                          ${isActive
                            ? `${colorScheme.active} scale-105`
                            : `${colorScheme.inactive} hover:scale-102 shadow-sm`
                          }
                        `}
                      >
                        <IconComponent className={`h-4 w-4 ${isActive ? 'drop-shadow-sm' : ''}`} />
                        <span className="relative z-10">{mode.label}</span>
                        {isActive && (
                          <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
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

      {/* 默认内容：热门品牌广告位 */}
      <div className="space-y-6">
        {/* 热门品牌 - 国际化专业设计 */}
        <Card className="shadow-2xl bg-gradient-to-br from-white via-blue-50/20 to-slate-50/15 dark:from-gray-900 dark:via-blue-950/15 dark:to-slate-950/10 border border-blue-100/40 dark:border-blue-900/20 backdrop-blur-md rounded-3xl">
          <CardHeader className="py-5 px-6 border-b border-blue-100/40 dark:border-blue-900/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-3 bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent font-bold">
                <Star className="h-6 w-6 text-blue-500" />
                热门品牌
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-500 rounded-xl"
                onClick={() => {
                  const params = new URLSearchParams();
                  params.set('mode', 'brand');
                  router.push(`/search?${params.toString()}`);
                }}
              >
                查看更多 <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-1">
              {chipVendors.map((vendor, index) => (
                <div
                  key={vendor.name}
                  onClick={() => handleVendorClick(vendor)}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-white via-blue-50/15 to-slate-50/10 dark:from-gray-800 dark:via-blue-950/10 dark:to-slate-950/5 rounded-lg border border-blue-100/40 dark:border-blue-900/20 hover:border-blue-300/60 dark:hover:border-blue-600/40 transition-all duration-500 hover:shadow-2xl group-hover:scale-110 hover:-translate-y-2 backdrop-blur-sm">
                    <div className="w-full h-full rounded-md flex items-center justify-center shadow-lg bg-white dark:bg-gray-700 overflow-hidden border border-gray-100/60 dark:border-gray-600/60 group-hover:shadow-xl transition-all duration-500">
                      <Image
                        src={vendor.image}
                        alt={vendor.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
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
    </div>
  );
}
