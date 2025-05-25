
"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/components/shared/search-bar";
import FilterPanel, { type ChipFilters } from "@/components/shared/filter-panel";
import ChipListItem from "@/components/shared/chip-list-item"; // Import new component
import type { Chip } from "@/lib/types";
import { searchChips } from "@/lib/placeholder-data";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter, SearchX, FileText, RefreshCw, Zap, Sparkles, HelpCircle } from "lucide-react";

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

export default function ChipSearchContent() {
  const [searchResults, setSearchResults] = useState<Chip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuery, setCurrentQuery] = useState("");
  const [currentFilters, setCurrentFilters] = useState<ChipFilters>({});
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<SearchMode>('datasheet'); // 新增搜索模式状态
  const [hasSearched, setHasSearched] = useState(false); // 新增是否已搜索状态
  const [aiEnhanced, setAiEnhanced] = useState(false); // AI增强功能状态

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      // For demo purposes, ensure TPS5430 items are shown initially if query is empty
      const initialResults = searchChips("", {});
      // Prioritize TPS5430 items for demo if present
      const tpsDemoItems = initialResults.filter(c => c.model === 'TPS5430');
      const otherItems = initialResults.filter(c => c.model !== 'TPS5430');
      setSearchResults([...tpsDemoItems, ...otherItems]);
      setIsLoading(false);
    }, 500);
  }, []);

  const performSearch = (query: string, filters: ChipFilters, mode: SearchMode = searchMode, useAI: boolean = aiEnhanced) => {
    setIsLoading(true);
    setHasSearched(true);

    // AI增强搜索需要更长时间
    const searchDelay = useAI ? 1500 : 500;

    setTimeout(() => {
      // 根据搜索模式调用不同的搜索逻辑
      let results: Chip[] = [];
      switch (mode) {
        case 'datasheet':
          results = searchChips(query, filters);
          break;
        case 'silkscreen':
          // 这里可以调用专门的丝印搜索API
          results = searchChips(query, filters); // 暂时使用相同逻辑
          break;
        case 'brand':
          // 这里可以调用专门的品牌搜索API
          results = searchChips(query, filters); // 暂时使用相同逻辑
          break;
        default:
          results = searchChips(query, filters);
      }

      // 如果启用AI增强，可以对结果进行AI处理
      if (useAI) {
        // 这里可以添加AI增强逻辑，比如智能排序、相关推荐等
        console.log('AI增强搜索已启用');
      }

      setSearchResults(results);
      setIsLoading(false);
    }, searchDelay);
  };

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
    performSearch(query, currentFilters, searchMode);
  };

  const handleModeChange = (mode: SearchMode) => {
    setSearchMode(mode);
    // 如果已经有搜索内容，重新搜索
    if (currentQuery.trim()) {
      performSearch(currentQuery, currentFilters, mode);
    }
  };

  const handleAiToggle = () => {
    const newAiState = !aiEnhanced;
    setAiEnhanced(newAiState);

    // 如果已经有搜索内容，重新搜索以应用AI增强
    if (currentQuery.trim() && hasSearched) {
      performSearch(currentQuery, currentFilters, searchMode, newAiState);
    }
  };

  const handleApplyFilters = (filters: ChipFilters) => {
    setCurrentFilters(filters);
    performSearch(currentQuery, filters);
    setSheetOpen(false);
  };

  const handleClearFilters = () => {
    const emptyFilters = {};
    setCurrentFilters(emptyFilters);
    performSearch(currentQuery, emptyFilters);
  };

  return (
    <div className="space-y-4">
        {/* 固定搜索输入区 */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <SearchBar
              onSearch={handleSearch}
              className="flex-grow"
              placeholder={searchModes[searchMode].placeholder}
              initialQuery={currentQuery}
            />

            {/* AI增强功能按钮 - 高级设计 */}
            <div className="relative group">
              <Button
                variant={aiEnhanced ? "default" : "outline"}
                size="sm"
                onClick={handleAiToggle}
                title={aiEnhanced
                  ? "AI增强已启用 - 获得更智能的搜索结果"
                  : "启用AI增强搜索，获取更智能的结果和推荐"
                }
                className={`
                  relative transition-all duration-300 transform hover:scale-105
                  ${aiEnhanced
                    ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-purple-500/25 border-0'
                    : 'border-2 border-dashed border-purple-300 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/20'
                  }
                `}
              >
                <Sparkles className={`h-4 w-4 transition-all duration-300 ${aiEnhanced ? 'animate-pulse text-white' : 'text-purple-500'}`} />
                {!aiEnhanced && (
                  <span className="ml-1 text-xs font-medium text-purple-600 dark:text-purple-400">AI</span>
                )}
                {aiEnhanced && (
                  <>
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-md animate-pulse"></span>
                  </>
                )}
              </Button>

              {/* 悬浮提示 */}
              {!aiEnhanced && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded whitespace-nowrap">
                    点击启用AI增强
                  </div>
                </div>
              )}
            </div>

            {(searchMode === 'datasheet' || searchMode === 'brand') && (
              <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Filter className="mr-2 h-4 w-4" /> 更多筛选
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-md sm:max-w-sm p-0">
                  <FilterPanel
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearFilters}
                    initialFilters={currentFilters}
                    setSheetOpen={setSheetOpen}
                  />
                </SheetContent>
              </Sheet>
            )}
          </div>

        {/* 搜索模式切换器 - 现代化设计 */}
        <div className="flex items-center justify-center">
          <div className="inline-flex rounded-2xl bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 p-1.5 shadow-lg border border-white/20 dark:border-gray-700/20 backdrop-blur-sm">
            {Object.entries(searchModes).map(([key, mode]) => {
              const IconComponent = mode.icon;
              const isActive = searchMode === key;
              return (
                <button
                  key={key}
                  onClick={() => handleModeChange(key as SearchMode)}
                  className={`
                    relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300
                    ${isActive
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 scale-105'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }
                  `}
                >
                  <IconComponent className={`h-4 w-4 transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                  <span className="relative">
                    {mode.label}
                    {isActive && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 当前模式描述 - 优化设计 */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-full border border-blue-100 dark:border-blue-800/30">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
              {searchModes[searchMode].description}
            </p>
          </div>
        </div>
        </div>

        {/* 内容展示区（动态变化） */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner label={`正在${searchModes[searchMode].label}...`} />
        </div>
      ) : !hasSearched ? (
        // 初始状态 - 高级设计的引导界面
        <div className="relative">
          {/* 背景装饰 */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-orange-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-orange-950/20 rounded-2xl"></div>
          <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 dark:from-blue-800/20 dark:to-purple-800/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-orange-200/20 to-pink-200/20 dark:from-orange-800/20 dark:to-pink-800/20 rounded-full blur-xl"></div>

          {/* 主要内容 */}
          <div className="relative flex flex-col items-center justify-center py-16 px-6 text-center">
            {/* 图标区域 */}
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 mb-4">
                {React.createElement(searchModes[searchMode].icon, {
                  className: "h-10 w-10 text-white"
                })}
              </div>
              {/* 装饰性小图标 */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </div>

            {/* 标题和描述 */}
            <div className="space-y-4 max-w-lg">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                {searchModes[searchMode].label}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {searchMode === 'datasheet' && '输入芯片型号、制造商或特性关键词，快速查找详细资料'}
                {searchMode === 'silkscreen' && '输入芯片表面的丝印标识，查找对应的型号'}
                {searchMode === 'brand' && '输入品牌名称，查看该品牌的产品系列和热门型号'}
              </p>
            </div>

            {/* 功能特色展示 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 w-full max-w-2xl">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-gray-700/20">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-3">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <h4 className="font-semibold text-sm mb-1">极速搜索</h4>
                <p className="text-xs text-muted-foreground">毫秒级响应，海量数据库</p>
              </div>

              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-gray-700/20">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mb-3">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <h4 className="font-semibold text-sm mb-1">AI 增强</h4>
                <p className="text-xs text-muted-foreground">智能推荐，精准匹配</p>
              </div>

              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-gray-700/20">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <h4 className="font-semibold text-sm mb-1">详细资料</h4>
                <p className="text-xs text-muted-foreground">完整规格，应用指南</p>
              </div>
            </div>

            {/* 热门搜索提示 */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-3">🔥 热门搜索</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['STM32', 'ESP32', 'TPS5430', 'LM358', 'AMS1117'].map((term) => (
                  <button
                    key={term}
                    className="px-3 py-1 text-xs bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full transition-colors"
                    onClick={() => {
                      handleSearch(term);
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : searchResults.length > 0 ? (
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
            {searchMode === 'datasheet' && '没有芯片符合您的搜索条件。请尝试不同的关键词或调整您的筛选器。'}
            {searchMode === 'silkscreen' && '未找到该丝印对应的型号。请检查丝印是否正确或尝试其他丝印。'}
            {searchMode === 'brand' && '未找到该品牌的产品信息。请检查品牌名称是否正确或尝试其他品牌。'}
            {aiEnhanced && (
              <div className="mt-2 text-purple-600">
                💡 AI建议：尝试使用更通用的关键词或检查拼写
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
