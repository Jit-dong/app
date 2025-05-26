"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';
import ChipSearchContent from '@/components/tabs/chip-search-content';
import EnhancedSearchBar from '@/components/shared/enhanced-search-bar';
import LoadingSpinner from '@/components/shared/loading-spinner';

// 搜索模式类型定义
type SearchMode = 'datasheet' | 'silkscreen' | 'brand' | 'alternative';

// 搜索模式配置
const searchModes = {
  datasheet: {
    label: '查资料',
    description: '查找芯片详细资料和规格参数'
  },
  silkscreen: {
    label: '丝印反查',
    description: '通过丝印标识查找对应的芯片型号'
  },
  brand: {
    label: '查品牌',
    description: '查看品牌的产品系列和热门型号'
  },
  alternative: {
    label: '查替代',
    description: '查找芯片的替代型号和兼容产品'
  }
};

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get('q') || '';
  const mode = (searchParams.get('mode') as SearchMode) || 'datasheet';

  const [currentQuery, setCurrentQuery] = useState(query);

  const handleSearch = (newQuery: string) => {
    setCurrentQuery(newQuery);
    // 更新URL参数
    const params = new URLSearchParams();
    params.set('q', newQuery);
    params.set('mode', mode);
    router.push(`/search?${params.toString()}`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex-shrink-0"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              返回
            </Button>

            <div className="flex-1 max-w-2xl">
              <EnhancedSearchBar
                onSearch={handleSearch}
                initialQuery={currentQuery}
                placeholder={`${searchModes[mode].label} - ${searchModes[mode].description}`}
                className="w-full"
                showSuggestions={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 搜索结果内容 */}
      <div className="container mx-auto px-4 py-6">
        {query && (
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Search className="h-4 w-4" />
              <span>搜索模式：{searchModes[mode].label}</span>
            </div>
            <h1 className="text-xl font-semibold">
              搜索结果：<span className="text-primary">{query}</span>
            </h1>
          </div>
        )}

        {/* 使用现有的搜索组件，传递搜索参数并隐藏搜索框 */}
        <ChipSearchContent initialQuery={query} initialMode={mode} hideSearchBar={true} />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner label="加载搜索页面..." />
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
