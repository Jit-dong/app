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
      // 丝印反查跳转到独立页面
      if (searchMode === 'silkscreen') {
        router.push('/silkscreen');
        return;
      }

      // 查替代跳转到替代结果页面
      if (searchMode === 'alternative') {
        const params = new URLSearchParams();
        params.set('q', query);
        router.push(`/alternatives/results?${params.toString()}`);
        return;
      }

      // 其他模式跳转到搜索结果页面
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
    <div className="space-y-2 px-4 pt-1 pb-6">
      {/* 标题和搜索区域 - 统一渐变背景 */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <Card className="backdrop-blur-lg shadow-lg rounded-3xl overflow-hidden relative transition-all duration-500 bg-gradient-to-br from-orange-50/40 via-amber-50/30 to-yellow-50/20 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-yellow-950/10 border border-orange-200/40 dark:border-orange-800/30">

            {/* Slogan - 集成到卡片内 */}
            <div className="text-center pt-6 pb-2 px-4">
              <div className="relative">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-700 via-amber-600 to-yellow-600 bg-clip-text text-transparent drop-shadow-md">
                  发现新芯世界
                </h1>
              </div>
            </div>

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

                    // 统一橙色系按钮颜色
                    const buttonColors = {
                      precise: {
                        active: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30',
                        inactive: 'bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 text-orange-600 dark:text-orange-400 hover:from-orange-100 hover:to-orange-200 dark:hover:from-orange-900/70 dark:hover:to-orange-800/70 border border-orange-200/50 dark:border-orange-800/30'
                      },
                      silkscreen: {
                        active: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30',
                        inactive: 'bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50 text-amber-600 dark:text-amber-400 hover:from-amber-100 hover:to-amber-200 dark:hover:from-amber-900/70 dark:hover:to-amber-800/70 border border-amber-200/50 dark:border-amber-800/30'
                      },
                      alternative: {
                        active: 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-600/30',
                        inactive: 'bg-gradient-to-r from-orange-50 to-red-100 dark:from-orange-950/50 dark:to-red-900/50 text-orange-600 dark:text-orange-400 hover:from-orange-100 hover:to-red-200 dark:hover:from-orange-900/70 dark:hover:to-red-800/70 border border-orange-200/50 dark:border-orange-800/30'
                      },
                      cross: {
                        active: 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg shadow-yellow-600/30',
                        inactive: 'bg-gradient-to-r from-yellow-50 to-orange-100 dark:from-yellow-950/50 dark:to-orange-900/50 text-yellow-600 dark:text-yellow-400 hover:from-yellow-100 hover:to-orange-200 dark:hover:from-yellow-900/70 dark:hover:to-orange-800/70 border border-yellow-200/50 dark:border-yellow-800/30'
                      }
                    };

                    const colorScheme = buttonColors[key as keyof typeof buttonColors] || buttonColors.precise;

                    return (
                      <button
                        key={key}
                        onClick={() => {
                          handleModeChange(key as SearchMode);
                          // 丝印反查跳转到独立页面
                          if (key === 'silkscreen') {
                            router.push('/silkscreen');
                            return;
                          }
                          // 查替代跳转到查替代主页
                          if (key === 'alternative') {
                            router.push('/alternatives');
                            return;
                          }
                          // 其他模式跳转到搜索页面
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
        {/* 热门品牌 - 精致卡片设计 */}
        <Card className="shadow-lg bg-gradient-to-br from-white/80 via-orange-50/30 to-amber-50/20 dark:from-gray-900/80 dark:via-orange-950/20 dark:to-amber-950/10 border border-orange-200/40 dark:border-orange-800/30 backdrop-blur-lg rounded-2xl overflow-hidden">
          <CardHeader className="py-3 px-4 bg-gradient-to-r from-orange-50/50 to-amber-50/30 dark:from-orange-950/30 dark:to-amber-950/20 border-b border-orange-200/30 dark:border-orange-800/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent font-bold">
                <Star className="h-4 w-4 text-orange-500 drop-shadow-sm" />
                热门品牌
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-orange-600 hover:text-orange-700 hover:bg-orange-100/60 dark:hover:bg-orange-900/40 transition-all duration-300 rounded-lg text-xs px-2 py-1"
                onClick={() => {
                  const params = new URLSearchParams();
                  params.set('mode', 'brand');
                  router.push(`/search?${params.toString()}`);
                }}
              >
                查看更多 <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-3 border border-orange-200/50 dark:border-orange-800/30 rounded-2xl p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
              {chipVendors.slice(0, 12).map((vendor) => (
                <div
                  key={vendor.name}
                  onClick={() => handleVendorClick(vendor)}
                  className="group cursor-pointer"
                >
                  <div className="flex flex-col items-center space-y-1.5 p-2.5 rounded-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-orange-100/90 hover:to-amber-100/70 dark:hover:from-orange-800/60 dark:hover:to-amber-800/50 hover:shadow-xl hover:shadow-orange-500/25 dark:hover:shadow-orange-900/40 border border-orange-200/30 dark:border-orange-800/20 hover:border-orange-300/60 dark:hover:border-orange-600/50 group-hover:scale-110 group-hover:-translate-y-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                    {/* Logo区域 */}
                    <div className="w-14 h-10 flex items-center justify-center relative">
                      <Image
                        src={vendor.image}
                        alt={vendor.name}
                        width={56}
                        height={40}
                        className="max-w-full max-h-full object-contain group-hover:scale-115 transition-transform duration-300 relative z-10 drop-shadow-md group-hover:drop-shadow-xl filter group-hover:brightness-110"
                        style={{
                          // 智能缩放：根据品牌特点调整显示大小，实现视觉平衡
                          transform: (() => {
                            const brandScales: Record<string, string> = {
                              'STMicroelectronics': 'scale(1.2)',   // ST logo较小，需要放大
                              'Texas Instruments': 'scale(0.8)',    // TI logo较大，需要缩小
                              'Microchip': 'scale(0.9)',           // 略微缩小
                              'Infineon': 'scale(0.85)',           // 缩小
                              'NXP': 'scale(1.1)',                 // 放大
                              'Maxim': 'scale(1.0)',               // 标准大小
                              'Vishay': 'scale(0.8)',              // 较大，需要缩小
                              'Intersil': 'scale(1.0)',            // 标准大小
                              'Fujitsu': 'scale(0.85)',            // 缩小
                              'Toshiba': 'scale(0.9)',             // 略微缩小
                              'JRC': 'scale(1.3)',                 // 较小，需要放大
                              'NTE': 'scale(1.15)'                 // 放大
                            };
                            return brandScales[vendor.name] || 'scale(1.0)';
                          })()
                        }}
                        onError={(e) => {
                          // 如果图片加载失败，显示品牌名称缩写
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="text-orange-600 dark:text-orange-400 font-bold text-lg relative z-10 drop-shadow-sm">${vendor.shortName}</span>`;
                          }
                        }}
                      />
                    </div>

                    {/* 品牌名称 */}
                    <div className="text-center w-full">
                      <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-all duration-300 truncate max-w-full group-hover:scale-105 drop-shadow-sm">
                        {vendor.shortName}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 底部提示信息 */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                点击品牌快速搜索相关产品
              </p>
              <div className="mt-2 w-12 h-0.5 bg-gradient-to-r from-orange-300 to-amber-400 rounded-full mx-auto opacity-70"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
