
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
import { Filter, SearchX, FileText, RefreshCw, Zap } from "lucide-react";

// 搜索模式类型定义
type SearchMode = 'datasheet' | 'alternative' | 'silkscreen';

// 搜索模式配置
const searchModes = {
  datasheet: {
    label: '查资料',
    icon: FileText,
    placeholder: '搜索芯片型号、制造商、特性...',
    description: '查找芯片详细资料和规格参数'
  },
  alternative: {
    label: '查替代',
    icon: RefreshCw,
    placeholder: '输入原厂型号查找替代料',
    description: '查找芯片的替代料和兼容型号'
  },
  silkscreen: {
    label: '查丝印',
    icon: Zap,
    placeholder: '输入芯片丝印查询型号',
    description: '通过丝印标识查找对应的芯片型号'
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

  const performSearch = (query: string, filters: ChipFilters, mode: SearchMode = searchMode) => {
    setIsLoading(true);
    setHasSearched(true);
    setTimeout(() => {
      // 根据搜索模式调用不同的搜索逻辑
      let results: Chip[] = [];
      switch (mode) {
        case 'datasheet':
          results = searchChips(query, filters);
          break;
        case 'alternative':
          // 这里可以调用专门的替代料搜索API
          results = searchChips(query, filters); // 暂时使用相同逻辑
          break;
        case 'silkscreen':
          // 这里可以调用专门的丝印搜索API
          results = searchChips(query, filters); // 暂时使用相同逻辑
          break;
        default:
          results = searchChips(query, filters);
      }
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
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
          {(searchMode === 'datasheet' || searchMode === 'alternative') && (
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
            {searchMode === 'alternative' && '输入原厂型号，为您推荐兼容的替代料'}
            {searchMode === 'silkscreen' && '输入芯片表面的丝印标识，查找对应的型号'}
          </p>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="space-y-4">
          {/* 根据搜索模式显示不同的结果标题 */}
          {searchMode === 'alternative' && currentQuery && (
            <div className="text-sm text-muted-foreground mb-3">
              <span className="font-medium">{currentQuery}</span> 的替代料：
            </div>
          )}
          {searchMode === 'silkscreen' && currentQuery && (
            <div className="text-sm text-muted-foreground mb-3">
              丝印 <span className="font-medium">{currentQuery}</span> 可能对应的型号：
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
            {searchMode === 'alternative' && '未找到替代料'}
            {searchMode === 'silkscreen' && '未找到对应型号'}
          </AlertTitle>
          <AlertDescription>
            {searchMode === 'datasheet' && '没有芯片符合您的搜索条件。请尝试不同的关键词或调整您的筛选器。'}
            {searchMode === 'alternative' && '未找到该型号的替代料。请检查型号是否正确或尝试其他型号。'}
            {searchMode === 'silkscreen' && '未找到该丝印对应的型号。请检查丝印是否正确或尝试其他丝印。'}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
