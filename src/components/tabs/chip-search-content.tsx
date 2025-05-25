
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  const [showAiTooltip, setShowAiTooltip] = useState(false); // AI提示显示状态

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

    // 隐藏提示
    setShowAiTooltip(false);
  };

  const handleAiTooltip = () => {
    setShowAiTooltip(!showAiTooltip);
    // 3秒后自动隐藏提示
    if (!showAiTooltip) {
      setTimeout(() => setShowAiTooltip(false), 3000);
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
    <TooltipProvider>
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

            {/* AI增强功能按钮 */}
            <Tooltip open={showAiTooltip} onOpenChange={setShowAiTooltip}>
              <TooltipTrigger asChild>
                <Button
                  variant={aiEnhanced ? "default" : "outline"}
                  size="sm"
                  onClick={handleAiToggle}
                  onMouseEnter={() => !aiEnhanced && setShowAiTooltip(true)}
                  onMouseLeave={() => setShowAiTooltip(false)}
                  className={`
                    relative transition-all duration-200
                    ${aiEnhanced
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg'
                      : 'hover:bg-accent hover:text-accent-foreground'
                    }
                  `}
                >
                  <Sparkles className={`h-4 w-4 ${aiEnhanced ? 'animate-pulse' : ''}`} />
                  {aiEnhanced && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <p className="text-sm">
                  {aiEnhanced
                    ? "AI增强已启用 - 获得更智能的搜索结果"
                    : "启用AI增强搜索，获取更智能的结果和推荐"
                  }
                </p>
              </TooltipContent>
            </Tooltip>

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

        {/* 搜索模式切换器 */}
        <div className="flex items-center justify-center">
          <div className="inline-flex rounded-lg border border-border bg-background p-1">
            {Object.entries(searchModes).map(([key, mode]) => {
              const IconComponent = mode.icon;
              const isActive = searchMode === key;
              return (
                <button
                  key={key}
                  onClick={() => handleModeChange(key as SearchMode)}
                  className={`
                    inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all
                    ${isActive
                      ? 'bg-accent text-accent-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }
                  `}
                >
                  <IconComponent className="h-4 w-4" />
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 当前模式描述 */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {searchModes[searchMode].description}
          </p>
        </div>
      </div>

      {/* 内容展示区（动态变化） */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner label={`正在${searchModes[searchMode].label}...`} />
        </div>
      ) : !hasSearched ? (
        // 初始状态 - 显示提示信息或最近搜索
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4">
            {React.createElement(searchModes[searchMode].icon, {
              className: "h-12 w-12 text-muted-foreground/50"
            })}
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            {searchModes[searchMode].label}
          </h3>
          <p className="text-muted-foreground max-w-md">
            {searchMode === 'datasheet' && '输入芯片型号、制造商或特性关键词，快速查找详细资料'}
            {searchMode === 'silkscreen' && '输入芯片表面的丝印标识，查找对应的型号'}
            {searchMode === 'brand' && '输入品牌名称，查看该品牌的产品系列和热门型号'}
          </p>
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
    </TooltipProvider>
  );
}
