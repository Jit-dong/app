"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, FileText, RefreshCw, Zap, Sparkles, HelpCircle, Shuffle, SearchX } from 'lucide-react';
import ChipSearchContent from '@/components/tabs/chip-search-content';
import LoadingSpinner from '@/components/shared/loading-spinner';

// 搜索模式类型定义
type SearchMode = 'datasheet' | 'silkscreen' | 'cross' | 'alternative' | 'brand';

// 搜索模式配置
const searchModes: Record<SearchMode, { label: string; icon: any; placeholder: string; description: string }> = {
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
  brand: {
    label: '查品牌',
    icon: RefreshCw,
    placeholder: '输入品牌名称查看产品线',
    description: '查看品牌的产品系列和热门型号'
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

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 从 URL 获取 mode 参数，并验证是否是有效的 SearchMode
  const mode = searchParams.get('mode') as SearchMode | null;
  const initialMode: SearchMode = (mode && searchModes[mode]) ? mode : 'datasheet';

  const query = searchParams.get('q') || searchParams.get('query'); // 从URL获取q或query参数
  const initialQuery = query || '';

  // 处理返回按钮点击
  const handleBack = () => {
    router.back();
  };

  // Note: The search bar and results are now handled within ChipSearchContent
  // based on the initialMode prop.

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部美化主搜索栏 (只保留返回按钮) */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4"> {/* Reduced py for a slightly smaller header */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            返回
          </Button>
          {/* 根据当前模式显示页面标题 */}
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">{searchModes[initialMode].label}</h1>
        </div>
      </div>

      {/* 搜索内容区域 */}
      <div className="container mx-auto px-4 py-6">
        {/* 直接渲染 ChipSearchContent，由其内部根据 initialMode 处理搜索栏和内容 */}
        <ChipSearchContent initialQuery={initialQuery} initialMode={initialMode} />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    // 使用 Suspense 是因为 useSearchParams 需要在 Client Component 中使用，
    // 并且在渲染前可能需要等待。
    <Suspense fallback={<div className="flex justify-center py-12"><LoadingSpinner /></div>}>
      <SearchPageContent />
    </Suspense>
  );
}
